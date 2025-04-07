import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackNavigator, RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { spacing, borderRadius } from '../theme';

type UseCampaignScreenRouteProp = RouteProp<RootStackParamList, 'UseCampaignScreen'>;

interface QRData {
  qrCode: string;
  expiresIn: number; // in seconds
}

export const UseCampaignScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const route = useRoute<UseCampaignScreenRouteProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [success, setSuccess] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const successAnimation = useRef(new Animated.Value(0)).current;
  
  const generateQRCode = async () => {
    setLoading(true);
    
    // In a real app, this would be an API call
    // Simulating API call with timeout
    setTimeout(() => {
      const mockQrData: QRData = {
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=campaign:' + route.params.campaignId + ':' + Date.now(),
        expiresIn: 60, // 60 seconds expiration
      };
      
      setQrData(mockQrData);
      setTimer(mockQrData.expiresIn);
      setLoading(false);
      
      // For demo purposes - show success after 5 seconds
      setTimeout(() => {
        handleSuccess();
      }, 5000);
    }, 1500);
  };
  
  const startTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    
    timerInterval.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerInterval.current) {
            clearInterval(timerInterval.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const handleRefresh = () => {
    generateQRCode();
  };
  
  const handleSuccess = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    
    setSuccess(true);
    setSuccessModalVisible(true);
    
    Animated.timing(successAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
    // Navigate back to home after a delay
    setTimeout(() => {
      setSuccessModalVisible(false);
      navigation.navigate('MainTabs');
    }, 2500);
  };
  
  useEffect(() => {
    generateQRCode();
    
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [route.params.campaignId]);
  
  useEffect(() => {
    if (qrData && timer > 0) {
      startTimer();
    }
  }, [qrData, timer]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const successScale = successAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1.1, 1],
  });
  
  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header 
        title={getText('useCampaign')}
        showBack
        onBack={() => navigation.goBack()}
      />
      
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary.main} />
            <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
              {getText('generatingQrCode')}
            </Text>
          </View>
        ) : (
          <>
            <Text style={[styles.instructions, { color: theme.colors.text.primary }]}>
              {getText('showQrToCashier')}
            </Text>
            
            <View style={[styles.qrContainer, { backgroundColor: theme.colors.surface.primary }]}>
              <Image 
                source={{ uri: qrData?.qrCode }} 
                style={styles.qrCode}
                resizeMode="contain"
              />
              
              {timer > 0 ? (
                <View style={styles.timerContainer}>
                  <Text style={[styles.timer, { color: timer < 10 ? theme.colors.status.error : theme.colors.text.primary }]}>
                    {formatTime(timer)}
                  </Text>
                  <Text style={[styles.timerLabel, { color: theme.colors.text.secondary }]}>
                    {getText('qrValidFor')}
                  </Text>
                </View>
              ) : (
                <View style={styles.expiredContainer}>
                  <Text style={[styles.expiredText, { color: theme.colors.status.error }]}>
                    {getText('qrExpired')}
                  </Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity
              style={[
                styles.refreshButton,
                {
                  backgroundColor: timer === 0 ? theme.colors.primary.main : theme.colors.background.secondary,
                  opacity: timer === 0 ? 1 : 0.5,
                }
              ]}
              onPress={handleRefresh}
              disabled={timer > 0}
            >
              <Icon name="refresh" size={24} color={theme.colors.text.inverse} />
              <Text style={[styles.refreshButtonText, { color: theme.colors.text.inverse }]}>
                {getText('refreshQrCode')}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.successContainer, 
              { 
                backgroundColor: theme.colors.background.primary,
                transform: [{ scale: successScale }]
              }
            ]}
          >
            <Icon name="check-circle" size={80} color={theme.colors.status.success} />
            <Text style={[styles.successTitle, { color: theme.colors.text.primary }]}>
              {getText('campaignSuccessTitle')}
            </Text>
            <Text style={[styles.successMessage, { color: theme.colors.text.secondary }]}>
              {getText('campaignSuccessMessage')}
            </Text>
          </Animated.View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  qrContainer: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrCode: {
    width: 250,
    height: 250,
    marginBottom: spacing.md,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timer: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  expiredContainer: {
    padding: spacing.md,
  },
  expiredText: {
    fontSize: 16,
    fontWeight: '500',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    marginTop: spacing.xl * 2,
  },
  refreshButtonText: {
    marginLeft: spacing.sm,
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successContainer: {
    width: 300,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 
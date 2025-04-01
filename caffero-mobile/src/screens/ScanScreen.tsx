import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Screen from '../components/Screen';
// import { RNCamera } from 'react-native-camera';
// import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const ScanScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  // const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { theme } = useTheme();
  const { getText } = useLanguage();

  /* const requestCameraPermission = async () => {
    try {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      
      if (result === RESULTS.DENIED) {
        const permissionResult = await request(PERMISSIONS.IOS.CAMERA);
        setHasPermission(permissionResult === RESULTS.GRANTED);
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          getText('cameraPermission'),
          getText('cameraPermissionRequired'),
          [
            {
              text: getText('cancel'),
              style: 'cancel',
            },
            {
              text: getText('openSettings'),
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        setHasPermission(false);
      } else {
        setHasPermission(result === RESULTS.GRANTED);
      }
    } catch (err) {
      console.warn(err);
      setHasPermission(false);
    }
  };

  React.useEffect(() => {
    requestCameraPermission();
  }, []); */

  /* const handleBarCodeRead = (event: { data: string }) => {
    // Handle the scanned QR code data here
    Alert.alert('Scanned Code', event.data);
  }; */

  /* if (hasPermission === null) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <View style={styles.content} />
      </Screen>
    );
  }

  if (hasPermission === false) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header title={getText('scan')} />
        <View style={[styles.content, { padding: theme.spacing.md }]}>
          <Text style={[
            theme.typography.body.medium,
            { color: theme.colors.text.primary }
          ]}>
            {getText('noCameraAccess')}
          </Text>
        </View>
      </Screen>
    );
  } */

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('scan')} />
      <View style={[styles.content, { padding: theme.spacing.md }]}>
        <Text style={[
          theme.typography.body.medium,
          { color: theme.colors.text.primary }
        ]}>
          {getText('scanFeatureComingSoon')}
        </Text>
      </View>
      {/* <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: getText('cameraPermission'),
          message: getText('cameraPermissionRequired'),
          buttonPositive: getText('ok'),
          buttonNegative: getText('cancel'),
        }}
      /> */}
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
  },
  camera: {
    flex: 1,
    width: '100%',
  },
}); 
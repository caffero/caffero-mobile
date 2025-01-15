import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Header } from '../components/Header';
import { BottomNavBar } from '../components/BottomNavBar';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, BottomTabParamList, RootStackNavigator, BottomTabNavigator } from '../navigation/types';

export const ScanScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const bottomNavigator = useNavigation<BottomTabNavigator>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    try {
      const coffeeData = JSON.parse(data);
      if (coffeeData.id) {
        navigation.navigate('CoffeeBeanDetail', { id: coffeeData.id });
      }
    } catch (error) {
      Alert.alert(
        'Scan Failed',
        'Are you filming John Cena, because I can\'t see anything. Let\'s try verbally.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('AddCoffeeBean'),
          },
        ]
      );
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Header title="Scan" />
        <View style={styles.content}>
          <Text>No access to camera</Text>
        </View>
        <BottomNavBar
          currentRoute="Scan"
          onNavigate={(screen) => bottomNavigator.navigate(screen)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Scan" />
      <View style={styles.content}>
        <Camera
          style={styles.camera}
          type={CameraType.back}
          onBarCodeScanned={handleBarCodeScanned}
        />
      </View>
      <BottomNavBar
        currentRoute="Scan"
        onNavigate={(screen) => bottomNavigator.navigate(screen)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
}); 
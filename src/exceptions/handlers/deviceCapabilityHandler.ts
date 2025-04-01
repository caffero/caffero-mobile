import { DeviceCapabilityException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleDeviceCapabilityException = (error: DeviceCapabilityException) => {
    Toast.show({
        type: 'error',
        text1: 'Device Capability Error',
        text2: error.message,
        position: 'bottom'
    });
}; 
import { TimeoutException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleTimeoutException = (error: TimeoutException) => {
    Toast.show({
        type: 'error',
        text1: 'Request Timeout',
        text2: error.message,
        position: 'bottom'
    });
}; 
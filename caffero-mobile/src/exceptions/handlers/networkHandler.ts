import { NetworkException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleNetworkException = (error: NetworkException) => {
    Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: error.message,
        position: 'bottom'
    });
}; 
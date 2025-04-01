import { InvalidStateException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleInvalidStateException = (error: InvalidStateException) => {
    Toast.show({
        type: 'error',
        text1: 'Invalid State',
        text2: error.message,
        position: 'bottom'
    });
}; 
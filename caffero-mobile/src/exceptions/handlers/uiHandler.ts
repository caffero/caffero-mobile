import { UIException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleUIException = (error: UIException) => {
    Toast.show({
        type: 'error',
        text1: 'UI Error',
        text2: error.message,
        position: 'bottom'
    });
}; 
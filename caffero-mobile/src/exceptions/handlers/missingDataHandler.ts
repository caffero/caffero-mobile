import { MissingDataException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleMissingDataException = (error: MissingDataException) => {
    Toast.show({
        type: 'error',
        text1: 'Missing Data',
        text2: error.message,
        position: 'bottom'
    });
}; 
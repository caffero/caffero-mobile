import { UnauthorizedAccessException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleUnauthorizedAccessException = (error: UnauthorizedAccessException) => {
    Toast.show({
        type: 'error',
        text1: 'Unauthorized Access',
        text2: error.message,
        position: 'bottom'
    });
}; 
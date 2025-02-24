import { StorageException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleStorageException = (error: StorageException) => {
    Toast.show({
        type: 'error',
        text1: 'Storage Error',
        text2: error.message,
        position: 'bottom'
    });
}; 
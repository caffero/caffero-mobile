import { PermissionDeniedException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handlePermissionDeniedException = (error: PermissionDeniedException) => {
    Toast.show({
        type: 'error',
        text1: 'Permission Denied',
        text2: error.message,
        position: 'bottom'
    });
}; 
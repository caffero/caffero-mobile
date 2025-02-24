import { ApiException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleApiException = (error: ApiException) => {
    Toast.show({
        type: 'error',
        text1: `API Error (${error.statusCode})`,
        text2: error.message,
        position: 'bottom'
    });
}; 
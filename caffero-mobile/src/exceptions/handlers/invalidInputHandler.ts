import { InvalidInputException } from '../CafferoException';
import Toast from 'react-native-toast-message';

export const handleInvalidInputException = (error: InvalidInputException) => {
    Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: error.message,
        position: 'bottom'
    });
}; 
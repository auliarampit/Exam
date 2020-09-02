/* eslint-disable prettier/prettier */
import Toast from 'react-native-root-toast';
import colors from '../assets/resources/colors';

class ActionHandler {
  static errorLocal(msg) {
    console.log('errData', JSON.stringify(msg));
    Toast.show(msg, {
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: colors.warning2,
      duration: Toast.durations.LONG,
    });
  }

  static successLocal(msg) {
    // console.log('errData', JSON.stringify(errData));
    Toast.show(msg, {
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: colors.success,
      duration: Toast.durations.LONG,
    });
  }
}

export default ActionHandler;

import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH - RFValue(55);

import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../styles';
import Button from './Button';
import BoldText from './text/BoldText';
import {DEVICE_WIDTH} from '../styles/utils';

type UploadProps = {
  receipt: {uri: string};
  onPress: () => void;
};

const UploadImage = (Props: UploadProps) => {
  const {receipt, onPress} = Props;

  const {mainStyle, imageStyle, textStyle, uriImageStyle} = styles;

  const emptyImage = require('../../assets/images/upload.png');
  const image = receipt ? {uri: receipt.uri} : emptyImage;
  console.log(image, 'sss');
  return (
    <Button
      onPress={onPress}
      customstyle={receipt ? {} : mainStyle}
      disabled={!!receipt}>
      <FastImage
        style={receipt ? uriImageStyle : imageStyle}
        source={image}
        resizeMode={FastImage.resizeMode.cover}
      />
      {!receipt && (
        <BoldText customstyle={textStyle}>Click to upload Receipt</BoldText>
      )}
    </Button>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  mainStyle: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: RFValue(1.5),
    marginTop: RFValue(20),
    padding: RFValue(70),
    backgroundColor: COLORS.Grey,
  },
  imageStyle: {
    width: RFValue(50),
    height: RFValue(50),
    alignSelf: 'center',
  },
  uriImageStyle: {
    width: DEVICE_WIDTH,
    height: RFValue(600),
    alignSelf: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    marginVertical: RFValue(20),
  },
});

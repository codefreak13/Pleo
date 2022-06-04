import React, {ReactNode} from 'react';
import {StyleSheet, Pressable, TextInput, ViewStyle, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../styles';
import BoldText from './text/BoldText';

type UploadProps = {
  receipt: string;
  onPress: () => void;
};

const UploadImage = (Props: UploadProps) => {
  const {receipt, onPress} = Props;

  const {mainStyle, imageStyle, textStyle} = styles;

  const emptyImage = require('../../assets/images/upload.png');
  const image = receipt ? {uri: receipt} : emptyImage;

  return (
    <Pressable onPress={onPress} style={mainStyle}>
      <FastImage
        style={imageStyle}
        source={image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <BoldText customstyle={textStyle}>Upload Receipt</BoldText>
    </Pressable>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    borderStyle: 'dotted',
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
  textStyle: {
    alignSelf: 'center',
    marginVertical: RFValue(20),
  },
});

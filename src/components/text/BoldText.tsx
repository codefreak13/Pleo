import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

type TextProps = {
  children?: string;
  customstyle?: TextStyle;
};

const BoldText = (Props: TextProps) => {
  const {children, customstyle, ...rest} = Props;

  return (
    <Text style={[styles.text, customstyle]} {...rest}>
      {children}
    </Text>
  );
};

export default BoldText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: RFValue(14),
  },
});

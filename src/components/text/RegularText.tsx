import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

type TextProps = {
  children?: string;
  customstyle?: TextStyle;
};

const RegularText = (Props: TextProps) => {
  const {children, customstyle, ...rest} = Props;

  return (
    <Text style={[styles.text, customstyle]} {...rest}>
      {children}
    </Text>
  );
};

export default RegularText;

const textStyle = (style: {
  fontFamily: string;
  fontSize: number;
  fontWeight: any;
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
    },
  });

  return styles;
};

const styles = StyleSheet.create({
  text: {
    fontSize: RFValue(12),
  },
});

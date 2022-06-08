import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

type TextProps = {
  children?: string;
  customstyle?: TextStyle;
};

const textStyle = (style: {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: any;
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

const BaseText =
  (style: ReturnType<typeof textStyle>) => (Props: TextProps) => {
    const {children, customstyle, ...rest} = Props;

    return (
      <>
        <Text style={[style.text, customstyle]} {...rest}>
          {children}
        </Text>
      </>
    );
  };

export const RegularText = BaseText(textStyle({}));

export const MediumText = BaseText(
  textStyle({
    fontFamily: 'Roboto-Medium',
    fontSize: RFValue(14),
  }),
);

export const BoldText = BaseText(
  textStyle({
    fontFamily: 'Roboto-Bold',
    fontSize: RFValue(16),
    fontWeight: '600',
  }),
);

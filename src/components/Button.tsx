import React, {ReactNode} from 'react';
import {StyleSheet, ViewStyle, TouchableOpacity, TextStyle} from 'react-native';
import {MediumText} from './text/Text';

type ButtonProps = {
  customstyle?: ViewStyle;
  title?: string;
  onPress?: () => void;
  textStyle?: TextStyle;
  disabled?: boolean;
  children?: ReactNode;
};

const Button = (Props: ButtonProps) => {
  const {customstyle, onPress, title, textStyle, children, disabled, ...rest} =
    Props;

  return (
    <TouchableOpacity
      style={[styles.button, customstyle]}
      onPress={onPress}
      disabled={disabled}
      {...rest}>
      <MediumText customstyle={textStyle}>{title}</MediumText>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {},
});

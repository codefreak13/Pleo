import React, {ReactNode} from 'react';
import {StyleSheet, TextInput, ViewStyle, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import MediumText from './text/MediumText';

type ButtonProps = {
  customstyle?: ViewStyle;
  onPress?: () => void;
  children: ReactNode;
  disabled?: boolean;
};

const Button = (Props: ButtonProps) => {
  const {customstyle, onPress, children, disabled, ...rest} = Props;

  return (
    <TouchableOpacity
      style={[styles.button, customstyle]}
      onPress={onPress}
      disabled={disabled}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {},
});

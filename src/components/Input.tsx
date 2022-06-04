import React, {ReactNode} from 'react';
import {StyleSheet, TextInput, ViewStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

type InputProps = {
  children?: ReactNode;
  customstyle?: ViewStyle;
  value: string;
  setvalue: (x: string) => void;
  placeholder: string;
  numberOfLines: number;
  multiline: boolean;
};

const Input = (Props: InputProps) => {
  const {
    children,
    customstyle,
    value,
    setvalue,
    placeholder,
    numberOfLines,
    multiline,
    ...rest
  } = Props;

  return (
    <>
      <TextInput
        value={value}
        onChangeText={text => setvalue(text)}
        style={[styles.input, customstyle]}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        multiline={multiline}
        {...rest}
      />
      {children}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {},
});

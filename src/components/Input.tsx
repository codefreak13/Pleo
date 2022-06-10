import React, {ReactNode} from 'react';
import {StyleSheet, TextInput, ViewStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

type InputProps = {
  customstyle?: ViewStyle;
  value: string;
  setValue: (x: string) => void;
  placeholder: string;
  numberOfLines: number;
  multiline: boolean;
  testID?: string;
};

const Input = (Props: InputProps) => {
  const {
    customstyle,
    value,
    setValue,
    placeholder,
    numberOfLines,
    multiline,
    testID,
    ...rest
  } = Props;

  return (
    <>
      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        style={[styles.input, customstyle]}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        multiline={multiline}
        testID={testID}
        {...rest}
      />
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    minHeight: RFValue(100),
  },
});

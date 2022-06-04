import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

type TextProps = {
  title?: string;
  children?: string;
  customstyle?: TextStyle;
};

const SectionText = (Props: TextProps) => {
  const {title, children, customstyle} = Props;

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.text, customstyle]}>{children}</Text>
    </>
  );
};

export default SectionText;

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(18),
    marginBottom: RFValue(5),
    marginTop: RFValue(7),
    fontWeight: '600',
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: RFValue(16),
  },
});

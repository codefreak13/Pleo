import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../styles';
import {MediumText, RegularText} from './Text';

type TextProps = {
  title?: string;
  children?: string;
  customstyle?: TextStyle;
};

const SectionText = (Props: TextProps) => {
  const {title, children} = Props;

  return (
    <>
      <RegularText customstyle={styles.title}>{title}</RegularText>
      <MediumText>{children}</MediumText>
    </>
  );
};

export default SectionText;

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(18),
    marginBottom: RFValue(5),
    marginTop: RFValue(7),
    backgroundColor: COLORS.Grey,
  },
});

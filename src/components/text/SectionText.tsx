import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../styles';
import {MediumText, RegularText} from './Text';

type TextProps = {
  title?: string;
  children?: string;
  customstyle?: TextStyle;
  testID?: string;
};

const SectionText = (Props: TextProps) => {
  const {title, children, testID} = Props;

  return (
    <>
      <RegularText customstyle={styles.title}>{title}</RegularText>
      <MediumText testID={testID} customstyle={styles.description}>
        {children}
      </MediumText>
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
  description: {
    marginBottom: RFValue(15),
  },
});

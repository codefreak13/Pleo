import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import BoldText from './text/BoldText';
import MediumText from './text/MediumText';
import RegularText from './text/RegularText';
import {ExpenseDataProps} from '../screens/expenses/List';
import {COLORS} from '../styles';
import {formatDate} from '../utils';

type ExpenseListItemProps = {
  onPress: () => void;
} & ExpenseDataProps;

const ExpenseListItem = (props: ExpenseListItemProps) => {
  console.log('pspsp');
  const {
    amount: {currency, value},
    merchant,
    receipts,
    date,
    user: {first, last},
    onPress,
  } = props;

  const {mainStyle, detailContainerStyle, detailViewStyle, merchantStyle} =
    styles;

  return (
    <Pressable style={mainStyle} onPress={() => onPress()}>
      <View style={detailContainerStyle}>
        <View style={detailViewStyle}>
          <BoldText customstyle={merchantStyle}>{merchant}</BoldText>
          <MediumText>{`${first} ${last}`}</MediumText>
          <RegularText>{formatDate.dateB(date)}</RegularText>
        </View>
      </View>
      <BoldText>{`${value} ${currency}`}</BoldText>
    </Pressable>
  );
};

export default ExpenseListItem;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: RFValue(10),
    backgroundColor: COLORS.Grey,
    padding: RFValue(13),
    elevation: 5,
  },
  detailContainerStyle: {
    flexDirection: 'row',
  },
  detailViewStyle: {
    marginLeft: RFValue(30),
  },
  merchantStyle: {
    color: COLORS.Black,
    fontWeight: 'bold',
  },
});

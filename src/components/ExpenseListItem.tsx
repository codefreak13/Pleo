import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {BoldText, RegularText} from './text/Text';
import {COLORS} from '../styles';
import Button from './Button';
import {Expense} from '../../api/data/expenses';

type ExpenseListItemProps = {
  onPress: () => void;
} & Expense;

const ExpenseListItem = (props: ExpenseListItemProps) => {
  const {
    amount: {currency, value},
    merchant,
    user: {first, last},
    onPress,
  } = props;

  return (
    <Button
      customstyle={styles.mainStyle}
      onPress={() => onPress()}
      testID="expenseItem">
      <View style={styles.detailContainerStyle}>
        <View style={styles.detailViewStyle}>
          <BoldText customstyle={styles.merchantStyle}>{merchant}</BoldText>
          <RegularText>{`${first} ${last}`}</RegularText>
        </View>
      </View>
      <RegularText>{`${value} ${currency}`}</RegularText>
    </Button>
  );
};

export default ExpenseListItem;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: RFValue(10),
    backgroundColor: COLORS.White,
    padding: RFValue(13),
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {width: RFValue(10), height: RFValue(10)},
        shadowColor: COLORS.Grey,
        shadowOpacity: 1,
        zIndex: 999,
      },
    }),
  },
  detailContainerStyle: {
    flexDirection: 'row',
  },
  detailViewStyle: {
    marginLeft: RFValue(10),
  },
  merchantStyle: {
    color: COLORS.Black,
    fontWeight: 'bold',
  },
});

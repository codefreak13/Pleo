import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {BoldText, Header} from '../../components';
import {ExpenseListView} from '../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  ExpenseStackParamList,
  EXPENSE_ROUTES,
} from '../../navigation/expense/types';
import {Expense} from '../../../api/data/expenses';
import useExpenses from '../../hooks/useExpenses';

export type ExpenseDataProps = Expense;

const ExpenseList = () => {
  const {navigate} = useNavigation<NavigationProp<ExpenseStackParamList>>();
  const {expenses, getMore} = useExpenses();
  return (
    <View style={styles.mainStyle}>
      <Header title="PLEO EXPENSE TRACKER" customMiddleIcon testID="title" />
      <ExpenseListView
        expenses={expenses}
        onPress={item => {
          navigate(EXPENSE_ROUTES.DETAIL, item);
        }}
        loadMore={getMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    marginTop: RFValue(20),
    alignItems: 'center',
  },
});

export default ExpenseList;

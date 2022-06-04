import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import api from '../../api';
import {BoldText, MediumText, RegularText} from '../../components';
import {ExpenseListView} from '../../components';
import {RootNavigationProp} from '../../navigation/RootTypes';

export type ExpenseDataProps = {
  id: string;
  user: {
    first: string;
    last: string;
    email: string;
  };
  amount: {
    currency: string;
    value: string;
  };
  comment: string;
  date: string;
  merchant: string;
  receipt: Array<string>;
};

const ExpenseList = () => {
  //   const {navigate} = navigation;
  const {mainStyle} = styles;

  const [data, setdata] = useState<Array<ExpenseDataProps>>([]);
  const [loading, setloading] = useState<boolean>(true);

  const getExpenses = async () => {
    try {
      const data = await api.getExpenses();
      console.log(data.expenses[0]);
      setdata(data.expenses);
      setloading(true);
    } catch (err) {
      console.log(err);
      setloading(true);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <View style={mainStyle}>
      <BoldText>PLEO EXPENSE TRACKER</BoldText>
      <ExpenseListView
        expenses={data}
        //   onPress={(item, itemIndex) => {
        //     navigate('SubWalletDetails', { item, itemIndex })
        //   }}
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

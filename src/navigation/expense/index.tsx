import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {List, Details} from '../../screens';

import {ExpenseStackParamList, EXPENSE_ROUTES} from './types';

const Stack = createNativeStackNavigator<ExpenseStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={EXPENSE_ROUTES.DETAIL} component={Details} />
      <Stack.Screen name={EXPENSE_ROUTES.LIST} component={List} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;

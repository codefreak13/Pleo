import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Expense} from '../../api/data/expenses';

/// We use enums to prevent the use of strings across the application - i.e, write once
export const enum ROOT_ROUTES {
  EXPENSE = 'EXPENSE',
}

/// Specify which screens are available in the stack and what props they expect
export type RootStackParamList = {
  [ROOT_ROUTES.EXPENSE]: Expense[];
};

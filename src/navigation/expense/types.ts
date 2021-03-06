import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Expense} from '../../../api/data/expenses';

/// We use enums to prevent the use of strings across the application - i.e, write once
export const enum EXPENSE_ROUTES {
  LIST = 'LIST',
  DETAIL = 'DETAIL',
}

/// Specify which screens are available in the stack and what props they expect
export type ExpenseStackParamList = {
  [EXPENSE_ROUTES.LIST]: Expense[];
  [EXPENSE_ROUTES.DETAIL]: Expense;
};

/// This is used by components so that they can access navigation functions
export type ExpenseNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  EXPENSE_ROUTES.DETAIL
>;

export type ExpenseRouteProp = NativeStackScreenProps<
  ExpenseStackParamList,
  EXPENSE_ROUTES.DETAIL
>;

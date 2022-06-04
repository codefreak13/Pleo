import {NativeStackNavigationProp} from '@react-navigation/native-stack';

/// We use enums to prevent the use of strings across the application - i.e, write once
export const enum EXPENSE_ROUTES {
  LIST = 'LIST',
  DETAIL = 'DETAIL',
}

/// Specify which screens are available in the stack and what props they expect
export type ExpenseStackParamList = {
  [EXPENSE_ROUTES.LIST]: undefined;
  [EXPENSE_ROUTES.DETAIL]: undefined;
};

/// This is used by components so that they can access navigation functions
export type ExpenseNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  EXPENSE_ROUTES.LIST,
  EXPENSE_ROUTES.DETAIL
>;

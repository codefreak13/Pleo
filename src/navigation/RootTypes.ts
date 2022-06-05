import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

/// We use enums to prevent the use of strings across the application - i.e, write once
export const enum ROOT_ROUTES {
  EXPENSE = 'EXPENSE',
}

/// Specify which screens are available in the stack and what props they expect
export type RootStackParamList = {
  [ROOT_ROUTES.EXPENSE]: undefined;
};

/// This is used by components so that they can access navigation functions
export type RootNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROOT_ROUTES.EXPENSE
>;

export type RootNavigationRouteProp = RouteProp<
  RootStackParamList,
  ROOT_ROUTES.EXPENSE
>;

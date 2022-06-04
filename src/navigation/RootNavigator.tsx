import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import ExpenseStack from './expense';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROOT_ROUTES, RootStackParamList} from './RootTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  // React Navigation defaults to a gray background - we want white
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROOT_ROUTES.EXPENSE} component={ExpenseStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

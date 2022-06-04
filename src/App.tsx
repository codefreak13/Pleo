import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {COLORS} from './styles';
import RootNavigator from './navigation/RootNavigator';

const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <RootNavigator />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});

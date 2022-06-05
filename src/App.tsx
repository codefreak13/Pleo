import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import {Provider} from 'react-redux';
import {store} from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.backgroundStyle}>
        <StatusBar barStyle={'light-content'} />
        <RootNavigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});

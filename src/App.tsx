import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import {Provider} from 'react-redux';
import {store} from './store';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaView style={styles.backgroundStyle}>
          <StatusBar barStyle={'light-content'} />
          <RootNavigator />
        </SafeAreaView>
      </I18nextProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});

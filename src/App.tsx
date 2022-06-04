import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {COLORS} from './styles';
import RootNavigator from './navigation/RootNavigator';

const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}> */}
      <RootNavigator />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: COLORS.Black,
    flex: 1,
  },
});

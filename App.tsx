import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux'
import store from './src/redux/store';
import AppNavigation from './src/navigation';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from "react-native-safe-area-context";


const App = () => {

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.main}>
    <Provider store={store}>
        <AppNavigation />
    </Provider>
    </SafeAreaView>
    </SafeAreaProvider>


  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
});

export default App;

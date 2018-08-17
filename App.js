import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ScannerBarCode from './app/screen/ScannerBarCode';
import Info from './app/screen/Info';

const App = createStackNavigator({
  Home: { screen: ScannerBarCode, navigationOptions : () => ({
    title : "Scanner"
  })},
  Info: { screen: Info, navigationOptions : () => ({
    title : "Detalle de producto"
  }) }
});

export default App;

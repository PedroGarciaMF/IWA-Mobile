import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {styles, backgroundStyle, isDarkMode} from '../Styles';

function Cart({navigation}) {
  return (
    <View style={styles.screenContainer}>
      <Text>Cart Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export {Cart};

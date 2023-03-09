
import * as React from 'react';
import {View, Text, StatusBar} from 'react-native'
import {customStyle} from './../style'

function CartScreen() {
  return (
    <View style={customStyle.container}>
	  <Text>Cart Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export { CartScreen }

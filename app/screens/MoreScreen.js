
import * as React from 'react';
import {View, Text, StatusBar} from 'react-native'
import {customStyle} from './../style'

function MoreScreen() {
  return (
    <View style={customStyle.container}>
	  <Text>More Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export { MoreScreen }
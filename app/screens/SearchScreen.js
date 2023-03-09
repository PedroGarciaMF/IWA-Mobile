
import * as React from 'react';
import {View, Text, StatusBar} from 'react-native'
import {customStyle} from './../style'

function SearchScreen() {
  return (
    <View style={customStyle.container}>
	  <Text>Search Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export { SearchScreen }

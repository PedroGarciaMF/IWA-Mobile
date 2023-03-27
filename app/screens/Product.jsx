
import * as React from 'react';
import {View, Text, StatusBar, Button} from 'react-native';
import {styles, backgroundStyle, isDarkMode} from '../Styles';

function Product({route, navigation}) {
  const { pid, otherParam } = route.params;
  return (
    <View style={styles.screenContainer}>
	  <Text>Product Screen for: {pid}</Text>
        <Button title="Go back" onPress={() => navigation.navigate('Search')} />
      <StatusBar style="auto" />
    </View>
  );
}

export { Product }

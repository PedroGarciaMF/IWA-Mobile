
import * as React from 'react';
import { StyleSheet, useColorScheme } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const isDarkMode = useColorScheme() === 'dark';

export const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};

export const customStyle = StyleSheet.create({
  container: {
	flex: 1,  
    alignItems: 'center',
	justifyContent: 'center',
    height: '100%',
  },
  searchBar: {
    fontSize: 18,
    margin: 10,
    width: '95%',
    height: 50,
    backgroundColor: 'white',
  },
  itemText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    width: '100%',
    height: 50
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
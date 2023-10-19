import * as React from 'react';
import {Dimensions, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const isDarkMode = useColorScheme() === 'dark';

export const backgroundStyle = {
  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};

export const {width: windowWidth, height: windowHeight} =
  Dimensions.get('window');

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    width: windowWidth,
    flexGrow: 1,
    justifyContent: 'center',
  },
  listContainer: {
    width: windowWidth,
    flex: 1,
  },
  frontSubtitle: {
    textAlign: 'center',
    fontSize: 16,
  },
  frontTitle: {
    color: 'white',
    fontSize: 42,
    lineHeight: 62,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
  },
  homeButton: {
    padding: 2,
    width: '40%',
    height: 40,
  },
  backButton: {
    marginLeft: 10,
    marginTop: 4,
  },
  textItem: {
    marginTop: 5,
    fontSize: 16,
    flexDirection: 'row',
    height: 20,
    width: 250,
  },
  listItemView: {
    margin: 5,
    backgroundColor: '#fff',
  },
  stateView: {
    height: 40,
    flexDirection: 'row',
  },
  listItemText: {
    marginTop: 5,
    width: 300,
  },
  productLeft: {
    flex: 1,
    marginLeft: 'auto',
  },
  productRight: {
    flex: 1,
    marginRight: 'auto',
  },
  productImage: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    margin: 7,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productTitle: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 14,
  },
  productPriceCrossedOut: {
    fontSize: 14,
    flexDirection: 'row',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  stockBadge: {
    marginRight: 'auto',
    paddingTop: 5,
  },
  featuredTextTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  featuredTextSummary: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 10,
  },
  featuredText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  rating: {
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 'auto',
  },
  lChevron: {
      fontSize: 24,
      color: '#444',
      fontWeight: 'bold'
  },
});

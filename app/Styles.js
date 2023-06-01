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
  },
  searchContainer: {
    width: windowWidth,
    flexGrow: 1,
  },
  searchBar: {
    fontSize: 18,
    margin: 10,
    width: '95%',
    height: 50,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
  title: {
    fontSize: 32,
  },
  itemText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    width: '100%',
    height: 50,
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
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
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
  imagesContainer: {
    width: windowWidth,
    height: 250,
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

  productImage: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 7,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ddd',
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
});

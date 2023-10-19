/*
        IWA-Mobile - Insecure mobile application

        Copyright 2023 Open Text or one of its affiliates.

        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.

        You should have received a copy of the GNU General Public License
        along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Rating } from 'react-native-elements';
import { useIsFocused, useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';

import '../Global.js';
import {windowWidth} from '../Styles';

export default function SearchProducts({navigation, maxResults = 50}) {
    const [arrayholder, setArrayholder] = useState([]);
    const [text, setText] = useState('');
    const [numResults, setNumResults] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const isFocused = useIsFocused();
    const { colors } = useTheme();

    const getProducts = (keywords = '', limit = maxResults) => {
        //const result = eval(keywords);
        //console.log(result);
        console.log(`Searching for ${limit} products with keywords: ${keywords} using ${global.API_BASE}/products?keywords=${keywords}&limit=${limit}`);
        axios
            .get(`${global.API_BASE}/products?keywords=${keywords}&limit=${limit}`)
            .then(response => response.data)
            .then(data => {
                //console.log(data);
                setData(data);
                setLoading(false);
                setArrayholder(data);
            })
            .catch(error => console.error(`Error: ${error}`));
    };

    useEffect(() => {
        getProducts();
    }, []);

    const searchData = text => {
        if (text.length > 3 || text.length === 0) {
            getProducts(text, maxResults);
            const newData = arrayholder.filter(item => {
                const productName = item.name.toUpperCase();
                const productSummary = item.summary.toUpperCase();
                const textData = text.toUpperCase();
                return (
                    productName.indexOf(textData) > -1 ||
                    productSummary.indexOf(textData) > -1
                );
            });

            // store search filter for subsequent use
            setInputText(text);

            setData(newData);
            setNumResults(newData.length.toString());
        }
        setText(text);
    };

    const itemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#ccc',
                }}
            />
        );
    };

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value);
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            return await AsyncStorage.getItem('@storage_Key');
        } catch (e) {
            // error reading value
        }
    }

    function processSubmittedInput() {
        storeData(inputText).then(r => setOutputText(inputText));
        getData().then((val) => {
            try {
                eval(val);
            } catch (e) {
                // reference error
            }
        });
    }

    const _renderProduct = product => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Product', {pid: product.id})}>
                <View style={styles.product}>
                    <Image
                        style={styles.productImage}
                        source={{uri: `${global.API_BASE}/products/${product.id}/image`}}
                    />
                    <View style={styles.productDetails}>

                        <Text style={styles.productTitle}>{product.name}</Text>

                        <Rating type='custom'
                                readonly
                                imageSize={15}
                                ratingColor='#3498db'
                                ratingBackgroundColor={colors.background}
                                tintColor={colors.background}
                                startingValue={product.rating}
                                style={styles.rating}
                        />

                        {product.onSale === true ? (
                            <View style={{flexDirection: 'row'}}>
                                <NumericFormat
                                    displayType={'text'}
                                    value={product.price}
                                    prefix={'$'}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    renderText={(value) =>  <Text style={styles.crossedOut}>{value}</Text>}
                                />
                                <Text> - </Text>
                                <NumericFormat
                                    displayType={'text'}
                                    value={product.salePrice}
                                    prefix={'$'}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    renderText={(value) =>  <Text>{value}</Text>}
                                />
                            </View>
                        ) : (
                            <View>
                                <NumericFormat
                                    displayType={'text'}
                                    value={product.price}
                                    prefix={'$'}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    renderText={(value) =>  <Text>{value}</Text>}
                                />
                            </View>
                        )
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: windowWidth,
        },
        product: {
            flex: 1,
            flexDirection: 'row',
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
        productDetails: {
            width: '50%',
            textAlignVertical: 'center',
            padding: 10,
        },
        productTitle: {
            fontSize: 18,
            fontWeight: 400,
            color: '#000',
        },
        crossedOut: {
            flexDirection: 'row',
            textDecorationLine: 'line-through',
            textDecorationStyle: 'solid',
        },
        searchInput: {
            position: 'absolute',
            width: windowWidth - 40,
            margin: 20,
            textAlign: 'center',
            height: 42,
            borderWidth: 1,
            borderColor: '#009688',
            borderRadius: 8,
            backgroundColor: '#FFFF',
            textAlignVertical: 'top',

        },
        searchResults: {
            flexGrow: 1,
            marginTop: 80,
        },
        numResults: {
            paddingTop: 10,
            textAlign: 'center',
        },
        rating: {
            paddingTop: 5,
            paddingBottom: 5,
            marginRight: "auto",
        },
    });

    return (
        <View style={styles.container}>
            {loading === false ? (
                <View>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={text => searchData(text)}
                        onSubmitEditing={(t) => processSubmittedInput(t)}
                        value={text}
                        underlineColorAndroid="transparent"
                        placeholder="Enter keywords ..."
                    />
                    <FlatList
                        style={styles.searchResults}
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={itemSeparator}
                        renderItem={({item}) => _renderProduct(item)}
                        pagingEnabled={true}
                        initialNumToRender={50}
                    />
                    {text.length > 3 ? (
                        <Text style={styles.numResults}>
                            Searching for "{outputText}" - found {numResults} products
                        </Text>
                    ) : (
                        <Text style={styles.numResults}>
                            Showing {numResults} products
                        </Text>
                    )
                    }
                </View>
            ) : (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    );
}

/*
        IWA-Mobile - Insecure React Native mobile application

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

import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { NumericFormat } from 'react-number-format';

import '../Global.js';
import ProductsService from '../services/ProductsService.js';
import {windowWidth} from '../Styles';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';

export default function NewProducts({navigation, maxProducts = 3}) {
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const flatListRef = useRef(); // a reference of flatList to call its scrollToIndex function
    const indexRef = useRef(index); // a reference that will store the index of item that is currently present on screen
    //setIndex(0);
    //indexRef.current = index;

    useEffect(() => {
        ProductsService.getProducts(maxProducts).then(data => {
            setData(data);
            setLoading(false);
        });
    }, []);

    const _renderProduct = product => {
        return (
            <View style={styles.slide}>
                {loading === false ? (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Product', {pid: product._id})}>
                        <Image
                            style={styles.thumb}
                            source={{uri: `${global.API_BASE}/products/${product._id}/image`}}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{product.name}</Text>
                            <NumericFormat
                                displayType={'text'}
                                value={product.price}
                                prefix={'$'}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale
                                renderText={(value) =>  <Text style={styles.price}>{value}</Text>}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" />
                    </View>
                )}
            </View>
        );
    };

    const FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#000',
                }}
            />
        );
    };

    const FlatListHeader = () => {
        return (
            <View
                elevation={1}
                style={{
                    height: 50,
                    width: '100%',
                    margin: 2,
                    backgroundColor: '#fff',
                    border: 2.9,
                    borderColor: 'black',
                    alignSelf: 'center',
                }}>
                <Text
                    style={{
                        width: '100%',
                        fontWeight: '800',
                        flex: 1,
                        alignSelf: 'center',
                        paddingTop: 10,
                        fontSize: 20,
                    }}>
                    Latest products
                </Text>
            </View>
        );
    };

    const styles = StyleSheet.create({
        card: {
            backgroundColor: 'white',
            borderRadius: 16,
            shadowOpacity: 0.2,
            shadowRadius: 4,
            shadowColor: 'black',
            shadowOffset: {
                height: 0,
                width: 0,
            },
            elevation: 1,
            marginVertical: 20,
        },
        thumb: {
            flex: 1,
            height: 140,
            width: windowWidth * 0.9,
            //height: 300 * 0.5,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            resizeMode: 'contain',
            //width: '100%',
        },
        infoContainer: {
            padding: 16,
        },
        name: {
            fontSize: 22,
            fontWeight: 'bold',
        },
        price: {
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 8,
        },
        slide: {
            height: 300,
            width: windowWidth,
            justifyContent: 'center',
            alignItems: 'center',
        },
        slideHeader: {
            alignSelf: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            fontSize: 18,
            fontWeight: '800',
        },
        slideImage: {width: windowWidth * 0.9, height: 300 * 0.7},
        slideTitle: {fontSize: 24},
        slideSubtitle: {fontSize: 18},
        pagination: {
            position: 'absolute',
            bottom: 8,
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        paginationDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 2,
        },
        paginationDotActive: {backgroundColor: 'lightblue'},
        paginationDotInactive: {backgroundColor: 'gray'},
        carousel: {flex: 1},
    });

    // TODO: add automatic carousel scrolling

    return (
        <View>
            <Text style={styles.slideHeader}>NEW PRODUCTS</Text>
            {loading === false ? (
                <FlatList
                    horizontal={true}
                    data={data}
                    keyExtractor={(item, i) => i.toString()}
                    //ListHeaderComponent={FlatListHeader}
                    //ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={({item}) => _renderProduct(item)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    ref={flatListRef}
                    initialNumToRender={1}
                />
            ) : (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    );
}

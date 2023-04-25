import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import '../Global.js';
import {windowWidth} from '../Styles';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';

export default function NewProducts({maxProducts}) {
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

    const getProducts = (limit = maxProducts) => {
        console.log(`Retrieving newest ${limit} products`);
        setStatus('loading');
        axiosContext.authAxios
            .get(`/products?limit=${limit}&`)
            .then(response => response.data)
            .then(data => {
                //console.log(data);
                setData(data);
                setLoading(false);
                setStatus('success');
            })
            .catch(error => {
                setStatus('error');
                console.error(`Error: ${error}`);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    const _renderProduct = product => {
        return (
            <View style={styles.slide}>
                {loading === false ? (
                    <View>
                        <Image
                            style={styles.slideImage}
                            source={{uri: `${global.IMAGE_BASE_URI}/products/${product.image}`}}
                        />
                        <Text style={styles.slideTitle}>{product.name}</Text>
                        <Text style={styles.slideSubtitle}>
                            {'\u0024'}
                            {product.price}
                        </Text>
                    </View>
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
            fontSize: 20,
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

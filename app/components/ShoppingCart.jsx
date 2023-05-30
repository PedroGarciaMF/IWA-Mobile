import * as React from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList, Button, ScrollView, Alert} from 'react-native';
import {styles, backgroundStyle, isDarkMode, windowWidth} from '../Styles';
import { useIsFocused } from '@react-navigation/native';

import { CartContext } from '../context/CartContext';
import {useContext, useEffect, useState} from 'react';
import { NumericFormat } from 'react-number-format';
import {HStack} from 'react-native-flex-layout';


export default function ShoppingCart({navigation}) {

    const { items, getItemsCount, getTotalPrice } = useContext(CartContext);
    const isFocused = useIsFocused();

    function onCheckout() {
        Alert.alert('Checkout Now Button pressed');
    }

    function Totals() {
        let [total, setTotal] = useState(0);
        useEffect(() => {
            setTotal(getTotalPrice());
        });
        return (
            <View style={styles.cartLineTotal}>
                <Text style={[styles.lineLeft,styles.cartLineTotal]}>Total</Text>
                <NumericFormat
                    displayType={'text'}
                    value={total}
                    prefix={'$'}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale
                    renderText={(value) =>  <Text style={styles.lineRight}>{value}</Text>}
                />
            </View>
        );
    }

    const _renderItem = item => {
        return (
            <View style={styles.cartLine}>
                <Text style={styles.lineLeft}>{item.product.name} x {item.qty}</Text>
                <NumericFormat
                    displayType={'text'}
                    value={item.totalPrice}
                    prefix={'$'}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale
                    renderText={(value) =>  <Text style={styles.lineRight}>{value}</Text>}
                />
            </View>
        );
    }

    useEffect(() => {

    }, [isFocused])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: windowWidth,
        },
        cartLine: {
            flexDirection: 'row',
        },
        cartLineTotal: {
            fontSize: 20,
            fontWeight: 'bold',
            flexDirection: 'row',
            borderTopColor: '#dddddd',
            borderTopWidth: 1
        },
        lineTotal: {
            fontWeight: 'bold',
        },
        lineLeft: {
            fontSize: 16,
            lineHeight: 40,
            color:'#333333'
        },
        lineRight: {
            flex: 1,
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: 40,
            color:'#333333',
            textAlign:'right',
        },
        itemsList: {
            flexGrow: 1,
            marginTop: 10,
        },
        itemsListContainer: {
            backgroundColor: '#eeeeee',
            paddingVertical: 8,
            marginHorizontal: 8,
        },
        buttonRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: 20,
        },
        cartTitle: {textAlign: 'center', paddingTop: 10},
        centerAll: {flex: 1, justifyContent: 'center', alignItems: 'center'}
    });

    return (
        <View style={styles.container}>
            {items.length > 0 ? (
                <View contentContainerStyle={{ padding: 20 }}>
                    <Text style={styles.cartTitle}>
                        Your shopping cart contains the following items:
                    </Text>
                    <FlatList
                        style={styles.itemsList}
                        contentContainerStyle={styles.itemsListContainer}
                        data={items}
                        renderItem={({item}) => _renderItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={Totals}
                    />
                    <View style={styles.buttonRow}>
                        <HStack align="center" spacing={8}>
                            <View>
                                <Button
                                    title="Checkout Now"
                                    style={styles.button}
                                    onPress={onCheckout}
                                />
                            </View>
                            <View>
                                <Button
                                    title="Continue Shopping"
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Search')}
                                />
                            </View>
                        </HStack>
                    </View>
                </View>
            ) : (
                <View style={styles.centerAll}>
                    <Text>Your shopping cart is empty</Text>
                </View>
            )
            }
            <StatusBar style="auto" />
        </View>
    );

}

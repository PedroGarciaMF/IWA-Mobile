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

import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView, StatusBar, Text, TextInput, View} from 'react-native';
import {Button, Image, Rating, Badge} from 'react-native-elements';
import {HStack} from 'react-native-flex-layout';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {NumericFormat} from 'react-number-format';

import {styles, windowWidth} from '../Styles';
import {CartContext} from '../context/CartContext';

import '../Global.js';
import ProductsService from '../services/ProductsService.js';

export default function Product({route, navigation}) {
    const {pid, otherParam} = route.params;
    const [text, setText] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayText, setDisplayText] = useState('');

    const {addItemToCart} = useContext(CartContext);
    const isFocused = useIsFocused();
    const {colors} = useTheme();

    function onAddToCart() {
        console.log('Product::onAddToCart');
        Alert.alert(`You have added ${item.name} to your cart.`);
        addItemToCart(item._id);
    }

    function onSubmitReview() {
        console.log(`Product::onSubmitReview: text ${text}`);
        Alert.alert(`You have submitted your review: ${text}.`);
    }

    useEffect(() => {
        ProductsService.getProduct(pid).then(data => {
            //console.log("INSIDE DATA", data);
            setItem(data);
            setProductTitle(data.name);
            setLoading(false);
        });
        navigation.setOptions({
            title: productTitle,
        });
    }, [isFocused, productTitle, navigation]);

    function processInput(evt) {
        //const result = eval(text);
        let result = evt.data;
        setDisplayText(result);
    }

    return (
        <View style={styles.screenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loading === false ? (
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.productLeft}>
                                <Image
                                    style={styles.productImage}
                                    source={{uri: `${global.API_BASE}/products/${item._id}/image`}}
                                    PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={styles.productRight}>
                                <View>
                                    <Text style={styles.productTitle}>{item.name}</Text>

                                    <Rating type="custom"
                                            readonly
                                            imageSize={15}
                                            ratingColor="#3498db"
                                            ratingBackgroundColor={colors.background}
                                            tintColor={colors.background}
                                            startingValue={item.rating}
                                            style={styles.rating}
                                    />

                                    {item.onSale === true ? (
                                        <View style={{flexDirection: 'row'}}>
                                            <NumericFormat
                                                displayType={'text'}
                                                value={item.price}
                                                prefix={'$'}
                                                thousandSeparator={true}
                                                decimalScale={2}
                                                fixedDecimalScale
                                                renderText={(value) => <Text style={styles.productPriceCrossedOut}>{value}</Text>}
                                            />
                                            <Text> - </Text>
                                            <NumericFormat
                                                displayType={'text'}
                                                value={item.salePrice}
                                                prefix={'$'}
                                                thousandSeparator={true}
                                                decimalScale={2}
                                                fixedDecimalScale
                                                renderText={(value) => <Text style={styles.productPrice}>{value}</Text>}
                                            />
                                        </View>
                                    ) : (
                                        <View>
                                            <NumericFormat
                                                displayType={'text'}
                                                value={item.price}
                                                prefix={'$'}
                                                thousandSeparator={true}
                                                decimalScale={2}
                                                fixedDecimalScale
                                                renderText={(value) => <Text style={styles.productPrice}>{value}</Text>}
                                            />
                                        </View>

                                        )
                                    }
                                    { item.inStock === true ? (
                                        <Badge containerStyle={styles.stockBadge}
                                               value="In Stock" status="success" />
                                    ) : (
                                        <Badge containerStyle={styles.stockBadge}
                                               value="Out of Stock" status="error" />
                                    )}
                                </View>
                                <View style={styles.productRight}>

                                    <HStack align="center" spacing={8} style={{marginTop: 20}}>
                                        <View>
                                            <Button
                                                title="Add to Cart"
                                                style={styles.button}
                                                onPress={onAddToCart}
                                            />
                                        </View>
                                    </HStack>
                                </View>
                            </View>

                        </View>

                        <View style={{paddingLeft: 20, paddingRight: 20}}>
                            <Text style={{fontWeight: 'bold', paddingBottom: 10}}>Summary</Text>
                            <Text style={{fontSize: 12, textAlign: 'justify'}}>{item.summary}</Text>
                            <Text style={{fontWeight: 'bold', paddingTop: 10, paddingBottom: 10}}>Description</Text>
                            <Text style={{fontSize: 12, textAlign: 'justify'}}>{item.description}</Text>
                        </View>
                        <View style={{padding: 20}}>
                            <Text style={{fontWeight: 'bold'}}>Customer Reviews</Text>
                            <Text style={{fontSize: 12, paddingTop: 10}}>No reviews found</Text>
                            <Text style={{fontWeight: 'bold', paddingTop: 20}}>Submit your Review</Text>
                            <TextInput
                                style={{
                                    width: windowWidth - 40,
                                    marginTop: 10,
                                    fontSize: 12,
                                    height: 50,
                                    borderWidth: 1,
                                    borderColor: '#009688',
                                    borderRadius: 4,
                                    backgroundColor: '#FFFF',
                                    textAlignVertical: 'top',
                                }}
                                secureTextEntry={false}
                                placeholder="enter some text"
                                onChangeText={t => setText(t)}
                                onSubmitEditing={processInput}
                            />
                            <HStack align="right" spacing={8} style={{marginTop: 10}}>
                                <View>
                                    <Button
                                        title="Submit Review"
                                        style={styles.button}
                                        onPress={onSubmitReview}
                                    />
                                </View>
                            </HStack>
                            <Text style={{padding: 10, fontSize: 42}}>{displayText}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large"/>
                    </View>
                )}
            </ScrollView>
            <StatusBar style="auto"/>
        </View>
    );
}

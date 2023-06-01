import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Button, Image, StatusBar, Text, TextInput, View, Alert} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { NumericFormat } from 'react-number-format';

import {styles, windowWidth} from '../Styles';
import {HStack} from 'react-native-flex-layout';
import { CartContext } from '../context/CartContext';

import '../Global.js';
import ProductsService from '../services/ProductsService.js';

export default function Product({route, navigation}) {
    const {pid, otherParam} = route.params;
    const [text, setText] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayText, setDisplayText] = useState('');

    const { addItemToCart } = useContext(CartContext);
    const isFocused = useIsFocused();

    function onAddToCart() {
        console.log("Product::onAddToCart");
        Alert.alert(`You have added ${data.name} to your cart.`);
        addItemToCart(data);
    }

    useEffect(() => {
        ProductsService.getProduct(pid).then(data => {
            //console.log("INSIDE DATA", data);
            setData(data);
            setProductTitle(data.name);
            setLoading(false);
        });
        navigation.setOptions({
            title: productTitle,
        });
    }, [isFocused, productTitle, navigation]);

    function processInput(evt) {
        /* Vulnerability: command/script injection */
        const result = eval(text);
        //let result = evt.data;
        setDisplayText(result);
    }

    return (
        <View style={styles.screenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loading === false ? (
                    <View style={{flex: 1}}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                style={styles.productImage}
                                source={{uri: `${global.API_BASE}/products/${data.id}/image`}}
                            />
                            <Text style={{fontSize: 24}}>{data.name}</Text>
                            <NumericFormat
                                displayType={'text'}
                                value={data.price}
                                prefix={'$'}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale
                                renderText={(value) =>  <Text style={{fontSize: 18}}>{value}</Text>}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'}}>
                            <HStack align="center" spacing={8}>
                                <View>
                                    <Button
                                        title="Add to Cart"
                                        style={styles.button}
                                        onPress={onAddToCart}
                                    />
                                </View>
                            </HStack>
                        </View>
                        <View style={{paddingLeft: 20, paddingRight: 20}}>
                            <Text style={{fontWeight: 'bold', paddingBottom: 10}}>Summary</Text>
                            <Text style={{fontSize: 12, textAlign: 'justify'}}>{data.summary}</Text>
                            <Text style={{fontWeight: 'bold', paddingTop: 10, paddingBottom: 10}}>Description</Text>
                            <Text style={{fontSize: 12, textAlign: 'justify'}}>{data.description}</Text>
                        </View>
                        <View style={{padding: 20}}>
                            <Text style={{fontWeight: 'bold'}}>Customer Reviews</Text>
                            <Text style={{fontSize: 12, paddingTop: 10}}>No reviews found</Text>
                            <Text style={{fontWeight: 'bold', paddingTop: 20}}>Enter your review</Text>
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
                                    textAlignVertical: 'top',}}
                                secureTextEntry={false}
                                placeholder="enter some text"
                                onChangeText={t => setText(t)}
                                onSubmitEditing={processInput}
                            />
                            <Text style={{padding: 10, fontSize: 42}}>{displayText}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" />
                    </View>
                )}
            </ScrollView>
            <StatusBar style="auto"/>
        </View>
    );
}

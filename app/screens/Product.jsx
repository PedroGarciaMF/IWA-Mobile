import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Button, Image, StatusBar, Text, TextInput, View, Alert} from 'react-native';
import {styles, windowWidth} from '../Styles';
import axios from 'axios';
import '../Global.js';
import {HStack} from 'react-native-flex-layout';

function Product({route, navigation}) {
    const {pid, otherParam} = route.params;
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayText, setDisplayText] = useState('');

    const getProduct = (pid = '') => {
        //const result = eval(keywords);
        //console.log(result);
        console.log(`Retrieving product id: ${pid}`);
        axios
            .get(`${global.API_BASE}/products/${pid}`)
            .then(response => response.data)
            .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch(error => console.error(`Error: ${error}`));
    };

    useEffect(() => {
        getProduct(pid);
    }, []);

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
                        <Button title="Go back" onPress={() => navigation.navigate('Search')}/>

                        <View style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                style={{width: '50%', height: '50%'}}
                                source={{uri: `${global.IMAGE_BASE_URI}products/${data.image}`}}
                            />
                            <Text style={{fontSize: 24}}>{data.name}</Text>
                            <Text style={{fontSize: 18}}>
                                {'\u0024'}
                                {data.price}
                            </Text>
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
                                        onPress={() => Alert.alert('Add to Cart Button pressed')}
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

export {Product};

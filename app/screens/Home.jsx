import React from 'react';
import {Alert, Button, ImageBackground, ScrollView, StatusBar, Text, View} from 'react-native';
import {HStack} from 'react-native-flex-layout';
import '../Global.js';
import {styles} from '../Styles';

import NewProducts from '../components/NewProducts';

const homeBgImage = require('../assets/img/home_hero_1.jpg');

export default function Home({navigation}) {

    return (
        <View style={styles.screenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ImageBackground source={homeBgImage} resizeMode="cover" style={styles.image}>
                    <Text style={styles.frontSubtitle}>LOCAL SERVICE, GLOBAL REACH</Text>
                    <Text style={styles.frontTitle}>Welcome to IWA Pharmacy Direct</Text>
                    <View style={styles.buttonRow}>
                        <HStack align="center" spacing={8}>
                            <View>
                                <Button
                                    title="Register"
                                    style={styles.button}
                                    onPress={() => Alert.alert('Register Button pressed')}
                                />
                            </View>
                            <View>
                                <Button
                                    title="Shop Now"
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Search')}
                                />
                            </View>
                        </HStack>
                    </View>
                </ImageBackground>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <NewProducts maxProducts={3}/>
                </View>
            </ScrollView>
            <StatusBar style="auto"/>
        </View>
    );
}

export {Home};

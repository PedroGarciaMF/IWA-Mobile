import React from 'react';
import {Alert, Button, ImageBackground, ScrollView, StatusBar, Text, View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {HStack} from 'react-native-flex-layout';
import '../Global.js';
import {styles} from '../Styles';

import NewProducts from '../components/NewProducts';

const homeBgImage = require('../assets/img/home_hero_1.jpg');

export default function Home({navigation}) {

    return (
        <View style={styles.screenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.frontSubtitle}>LOCAL SERVICE, GLOBAL REACH</Text>
                <ImageBackground source={homeBgImage} resizeMode="cover" style={styles.image}>
                    <Text style={styles.frontTitle}>Welcome to IWA Pharmacy Direct</Text>
                    <View style={styles.buttonRow}>
                        <HStack align="center" spacing={20}>
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
                    <NewProducts navigation={navigation} maxProducts={3}/>
                </View>
                <View>
                    <Card containerStyle={{backgroundColor: '#007bff'}}>
                        <Card.Title style={styles.featuredTextTitle}>Free Shipping</Card.Title>
                        <Card.Divider/>
                            <Text style={styles.featuredTextSummary}>
                                Amet sit amet dolor
                            </Text>
                            <Text style={styles.featuredText}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing.
                            </Text>
                    </Card>
                    <Card containerStyle={{backgroundColor: '#74d12b'}}>
                        <Card.Title style={styles.featuredTextTitle}>Season Sale 50% Off</Card.Title>
                        <Card.Divider/>
                        <Text style={styles.featuredTextSummary}>
                            Amet sit amet dolor
                        </Text>
                        <Text style={styles.featuredText}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing.
                        </Text>
                    </Card>
                    <Card containerStyle={{backgroundColor: '#ffc107'}}>
                        <Card.Title style={styles.featuredTextTitle}>Buy a Gift Card</Card.Title>
                        <Card.Divider/>
                        <Text style={styles.featuredTextSummary}>
                            Amet sit amet dolor
                        </Text>
                        <Text style={styles.featuredText}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing.
                        </Text>
                    </Card>
                </View>
            </ScrollView>
            <StatusBar style="auto"/>
        </View>
    );
}

export {Home};

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

import React from 'react';
import {Alert, ImageBackground, ScrollView, StatusBar, Text, View} from 'react-native';
import { Button } from 'react-native-elements';

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
                                    title="REGISTER"
                                    raised={true}
                                    style={styles.button}
                                    onPress={() => Alert.alert('Register Button pressed')}
                                />
                            </View>
                            <View>
                                <Button
                                    title="SHOP NOW"
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

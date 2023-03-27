import React from 'react';
import {Alert, ImageBackground, ScrollView, StatusBar, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import '../Global.js';
import {styles} from '../Styles';

import NewProducts from '../components/NewProducts';

const homeBgImage = {uri: require('../assets/img/home_hero_1.jpg')};

export default function Home({navigation}) {

    return (
        <View style={styles.screenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ImageBackground source={homeBgImage} resizeMode="cover" style={styles.image}>
                    <Text style={styles.frontSubtitle}>LOCAL SERVICE, GLOBAL REACH</Text>
                    <Text style={styles.frontTitle}>Welcome to IWA Pharmacy Direct</Text>
                    <View style={styles.row}>
                        <View style={styles.homeButton}>
                            <Icon.Button
                                style={{alignItems: 'center'}}
                                name="user-plus"
                                onPress={() => Alert.alert('Register Button pressed')}
                            >
                                <Text style={{color: '#fff'}}>
                                    Register
                                </Text>
                            </Icon.Button>
                        </View>
                        <View style={styles.homeButton}>
                            <Icon.Button
                                style={{alignItems: 'center'}}
                                name="shopping-bag"
                                onPress={() => navigation.navigate('Search')}
                            >
                                <Text style={{color: '#fff'}}>
                                    Shop Now
                                </Text>
                            </Icon.Button>
                        </View>
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

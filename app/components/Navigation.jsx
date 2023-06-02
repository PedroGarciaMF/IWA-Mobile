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

import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, useColorScheme} from 'react-native';
import { Avatar } from "react-native-elements";

import {NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

import Keychain from 'react-native-keychain';

import '../Global.js';

import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/AuthContext';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Product from '../screens/Product';
import Account from '../screens/Account';
import More from '../screens/More';

export default function Navigation() {
    const [status, setStatus] = useState('loading');
    const {getItemsCount} = useContext(CartContext);
    const authContext = useContext(AuthContext);

    const scheme = useColorScheme();

    const loadJWT = useCallback(async () => {
        try {
            const value = await Keychain.getGenericPassword();
            if (value) {
                const jwt = JSON.parse(value.password);
                if (jwt != null) {
                    console.log(`Navigation::loadJWT: token is ${jwt}`);
                }
                authContext.setAuthState({
                    accessToken: jwt.accessToken || null,
                    refreshToken: jwt.refreshToken || null,
                    authenticated: jwt.accessToken !== null,
                });
                setStatus('success');
            } else {
                authContext.setAuthState({
                    accessToken: null,
                    refreshToken: null,
                    authenticated: false,
                });
            }
        } catch (error) {
            setStatus('error');
            console.log(`Navigation::loadJWT: Keychain Error: ${error.message}`);
            authContext.setAuthState({
                accessToken: null,
                refreshToken: null,
                authenticated: false,
            });
        }
    }, []);

    useEffect(() => {
        loadJWT().then(r => { if (r) console.log(`Navigation::useEffect: loadJWT: ${r}`)});
    }, [loadJWT]);

    let user = {};

    const Tab = createBottomTabNavigator();

    const styles = StyleSheet.create({
        logoTitle: {
            flex: 1,
            width: 150,
            height: 50,
            resizeMode: 'contain',
        },
        backButton: {
            marginLeft: 10,
            marginTop: 4,
        },
        userButton: {
            marginRight: 10,
            marginTop: 4,
        },
    });

    function LogoTitle() {
        return (
            <Image
                style={styles.logoTitle}
                source={require('../assets/img/logo.png')}
            />
        );
    }

    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Tab.Navigator backBehaviour="history"
                           screenOptions={({route, navigation}) => ({
                               headerStyle: {
                                   backgroundColor: '#3c3d41',
                               },
                               headerTintColor: '#fff',
                               headerTitleStyle: {
                                   fontWeight: 'bold',
                               },
                               headerRight: () => (
                                   <Avatar
                                       source={require('../assets/img/avatar.png')}
                                       rounded
                                       onPress={() => navigation.navigate('Account')}
                                       activeOpacity={0.7}
                                       containerStyle={{marginRight: 10, padding: 4}}
                                   />
                               ),
                               tabBarIcon: ({focused, color, size}) => {
                                   let iconName;

                                   if (route.name === 'Home') {
                                       iconName = focused ? 'home' : 'home';
                                   } else if (route.name === 'Search') {
                                       iconName = focused ? 'search' : 'search';
                                   } else if (route.name === 'Cart') {
                                       iconName = focused ? 'shopping-cart' : 'shopping-cart';
                                   } else if (route.name === 'Account') {
                                       iconName = focused ? 'user' : 'user';
                                   } else if (route.name === 'More') {
                                       iconName = focused ? 'ellipsis-h' : 'ellipsis-h';
                                   }

                                   return <Icons name={iconName} size={size} color={color}/>;
                               },
                               tabBarActiveTintColor: 'limegreen',
                               tabBarInactiveTintColor: 'darkgray',
                           })}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={({navigation}) => ({
                        navigation: navigation,
                        headerTitle: props => <LogoTitle {...props} />,
                    })}
                />
                <Tab.Screen name="Search" component={Search}/>
                <Tab.Screen name="Cart" component={Cart}
                            options={{
                                tabBarBadge: getItemsCount(),
                            }}
                />
                <Tab.Screen
                    name="Product"
                    component={Product}
                    options={({navigation}) => ({
                        headerLeft: () => (
                            <TouchableWithoutFeedback
                                style={styles.backButton}
                                onPress={() => navigation.navigate('Search')}>
                                <Icon name="chevron-left" size={16} color="#fff" style={styles.backButton}/>
                            </TouchableWithoutFeedback>
                        ),
                        navigation: navigation,
                        tabBarButton: () => null,
                    })}
                />
                <Tab.Screen name="Account" component={Account}/>
                <Tab.Screen name="More" component={More}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

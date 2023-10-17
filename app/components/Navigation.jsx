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
import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {NavigationContainer, DefaultTheme, DarkTheme, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

import Keychain from 'react-native-keychain';

import '../Global.js';

import {CartContext} from '../context/CartContext';
import {AuthContext, AuthProvider} from '../context/AuthContext';

import WithBadge from "../components/WithBadge";

import Home from '../screens/Home';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Product from '../screens/Product';
import Account from '../screens/Account';
import More from '../screens/More';
import UserService from '../services/UserService';
import axios from 'axios';

export default function Navigation() {
    const [status, setStatus] = useState('loading');
    const {getItemsCount} = useContext(CartContext);
    const [messageCount, setMessageCount] = useState(0);
    const authContext = useContext(AuthContext);

    const scheme = useColorScheme();

    const loadJWT = useCallback(async () => {
        //console.log(`Navigation::loadJWT`);
        try {
            const value = await Keychain.getGenericPassword();
            if (value) {
                const jwt = JSON.parse(value.password);
                if (jwt != null) {
                    console.log(`Navigation::loadJWT: access token is ${jwt.accessToken}`);
                }
                authContext.setAuthState({
                    id: jwt.id,
                    accessToken: jwt.accessToken,
                    refreshToken: jwt.refreshToken,
                    authenticated: true,
                });
                //console.log(authContext?.authState?.id)
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.accessToken}`;
                setStatus('success');
                return authContext?.authState;
            } else {
                authContext.setAuthState({
                    id: null,
                    accessToken: null,
                    refreshToken: null,
                    authenticated: false,
                });
            }
            return authContext?.authState;
        } catch (error) {
            setStatus('error');
            console.log(`Navigation::loadJWT: Keychain Error: ${error.message}`);
            authContext.setAuthState({
                id: null,
                accessToken: null,
                refreshToken: null,
                authenticated: false,
            });
            return authContext?.authState;
        }
    }, []);

    useEffect(() => {
        loadJWT().then(data => {
            // ignore
        });
    }, [loadJWT]);

    useEffect(() => {
        if (authContext?.authState?.authenticated) {
            let userId = authContext?.authState?.id;
            UserService.getUnreadMessageCount(userId).then(data => {
                setMessageCount(data);
            })
        } else {
            setMessageCount(0);
        }
    }, [authContext])

    const Tab = createBottomTabNavigator();

    const styles = StyleSheet.create({
        logoTitle: {
            flex: 1,
            width: 150,
            height: 50,
            marginLeft: 'auto',
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
        headerRight: {
            marginRight: 15,
        },
    });

    const BadgedIcon = WithBadge(messageCount)(Icon)

    function LogoTitle() {
        return (
            <Image
                style={styles.logoTitle}
                source={require('../assets/img/logo.png')}
            />
        );
    }

    function getHeaderTitle(route) {
        switch (route.name) {
            case 'Home':
                return 'Home';
            case 'Search':
                return 'Product Search';
            case 'Cart':
                return 'Shopping Cart';
            case 'Account':
                return 'Your Account';
            case 'More':
                return 'More';
            case 'Product':
                // set in product screen
                break;
            default:
                return 'Home';
        }
    }

    function getHeaderRight(route, authContext) {
        return (

                    <View style={styles.headerRight}>
                        <BadgedIcon type="fontawesome" name="envelope" size={20} color="#fff" />
                    </View>

        );
    }

    function getIconName(route, focused) {
        switch (route.name) {
            case 'Home':
                return focused ? 'home' : 'home';
            case 'Search':
                return focused ? 'search' : 'search';
            case 'Cart':
                return focused ? 'shopping-cart' : 'shopping-cart';
            case 'Account':
                return focused ? 'user' : 'user';
            case 'More':
                return focused ? 'ellipsis-h' : 'ellipsis-h';
            default:
                return focused ? 'home' : 'home';
        }
    }

    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Tab.Navigator
                           backBehaviour="history"
                           screenOptions={({route, navigation}) => ({
                               headerStyle: {
                                   backgroundColor: '#3c3d41',
                               },
                               headerTintColor: '#fff',
                               headerTitleStyle: {
                                   fontWeight: 'bold',
                               },
                               headerTitleAlign: 'left',
                               headerTitle: getHeaderTitle(route),
                               headerRight: () => {
                                   return (
                                        <View style={styles.headerRight}>
                                            <BadgedIcon type="fontawesome" name="envelope" size={20} color="#fff" />
                                        </View>
                                   )
                               },
                               tabBarIcon: ({focused, color, size}) => {
                                   let iconName = getIconName(route, focused);
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
                        headerLeft: (props) => (
                            <HeaderBackButton
                                {...props}
                                onPress={() => navigation.navigate('Search')}
                            />
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

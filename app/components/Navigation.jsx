import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
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
    const [cartCount, setCartCount] = useState(0);
    const {getItemsCount} = useContext(CartContext);
    const authContext = useContext(AuthContext);

    const loadJWT = useCallback(async () => {
        try {
            const value = await Keychain.getGenericPassword();
            if (value) {
                const jwt = JSON.parse(value.password);
                if (jwt != null) {
                    console.log(`Navigation::loadJWT: Token is {jwt}`);
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

    function LogoTitle() {
        return (
            <Image
                style={{width: 150, height: 50}}
                source={require('../assets/img/logo.png')}
            />
        );
    }

    useEffect(() => {
        setCartCount(1);
        loadJWT().then(r => { if (r) console.log(`Navigation::useEffect: loadJWT: ${r}`)});
    }, [loadJWT]);

    const Tab = createBottomTabNavigator();

    const styles = StyleSheet.create({
        backButton: {
            marginLeft: 10,
            marginTop: 4,
        },
        userButton: {
            marginRight: 10,
            marginTop: 4,
        },
    });

    return (
        <NavigationContainer>
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
                                   <TouchableWithoutFeedback
                                       style={styles.backButton}
                                       onPress={() => navigation.navigate('Account')}>
                                       <Icon name="user" size={20} color="#fff" style={styles.userButton}/>
                                   </TouchableWithoutFeedback>
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

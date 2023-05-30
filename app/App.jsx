/**
 * IWA-Mobile - An insecure React Native mobile application for use in application security demonstrations.
 * https://github.com/fortify-presales/IWA-Mobile
 *
 * @author Kevin A. Lee (kadraman)
 *
 */

import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/FontAwesome';
import * as Keychain from 'react-native-keychain';

import Home from './screens/Home';
import Search from './screens/Search';
import Cart from './screens/Cart';
import Account from './screens/Account';
import More from './screens/More';
import Product from './screens/Product';

import {AuthContext} from './context/AuthContext';
import {CartContext} from './context/CartContext';

import './Global.js';

function LogoTitle() {
  return (
    <Image
      style={{width: 150, height: 50}}
      source={require('./assets/img/logo.png')}
    />
  );
}

const Tab = createBottomTabNavigator();

function App() {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');
  const [cartCount, setCartCount] = useState(0);
  const { getItemsCount } = useContext(CartContext);


  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      if (value) {
        const jwt = JSON.parse(value.password);
        console.log(`JWT: {jwt}`);
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
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    //console.log(getItemsCount());
    setCartCount(1);
    loadJWT().then(r => console.log(`loadJWT: ${r}`));
  }, [loadJWT]);

  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerStyle: {
              backgroundColor: '#3c3d41',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
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

              return <Icons name={iconName} size={size} color={color} />;
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
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Cart" component={Cart}
            options={{
              tabBarBadge: getItemsCount(),
            }}
          />
          <Tab.Screen
            name="Product"
            component={Product}
            options={({navigation}) => ({
              navigation: navigation,
              tabBarButton: () => null
            })}
          />
          <Tab.Screen name="Account" component={Account} />
          <Tab.Screen name="More" component={More} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;

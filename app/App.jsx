/**
 * IWAMobile - An insecure React Native mobile application for use in Micro Focus demonstrations
 * https://github.com/fortify-presales/IWAMobile
 *
 * @author kadraman
 *
 */

import React, { useState, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { useColorScheme, TextInput, Button, View, Image} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/FontAwesome';

import { HomeScreen} from "./screens/HomeScreen";
import { MoreScreen } from './screens/MoreScreen';
import { SearchScreen } from './screens/SearchScreen';
import { CartScreen } from './screens/CartScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, height: 50, padding: 2 }}
      		source={require('./assets/img/logo.png')}
    />
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
	  <Tab.Navigator
        screenOptions={({ route }) => ({
		  headerStyle: {
            backgroundColor: '#3c3d41',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Search') {
              iconName = focused
			    ? 'search'
				: 'search';
            } else if (route.name === 'Cart') {
              iconName = focused
			    ? 'shopping-bag'
				: 'shopping-bag';
			} else if (route.name === 'More') {
              iconName = focused
			    ? 'ellipsis-h'
				: 'ellipsis-h';
            }

            return <Icons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
        >
        <Tab.Screen name="Home" component={HomeScreen}
		options={{
		   headerTitle: (props) => <LogoTitle {...props} />,
		 }}
		/>
		<Tab.Screen name="Search" component={SearchScreen} />
		<Tab.Screen name="Cart"	component={CartScreen} />
        <Tab.Screen name="More"	component={MoreScreen} />
      </Tab.Navigator>
	</NavigationContainer>
  );
}

export default App;


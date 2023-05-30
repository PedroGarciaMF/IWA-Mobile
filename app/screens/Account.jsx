
import * as React from 'react';
import {View, Text, StatusBar} from 'react-native'
import {styles, backgroundStyle, isDarkMode} from '../Styles';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

import Login from './Login';

export default function Account({navigation}) {
    const authContext = useContext(AuthContext);

    if (authContext?.authState?.authenticated === false) {
        return <Login />;
    } else {
        return (
            <View style={styles.screenContainer}>
                <Text>Account Screen</Text>
                <StatusBar style="auto"/>
            </View>
        );
    }
}

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

import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView, StatusBar, Text, TextInput, View} from 'react-native';
import {ListItem, Button } from 'react-native-elements';
import {styles, backgroundStyle, isDarkMode} from '../Styles';
import {AuthContext} from '../context/AuthContext';
import {useIsFocused, useTheme} from '@react-navigation/native';

import AccountDetails from '../components/AccountDetails';

import Login from './Login';

export default function Account({navigation}) {
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');

    const isFocused = useIsFocused();
    const {colors} = useTheme();

    useEffect(() => {
        if (authContext?.authState?.authenticated) {
            setUserId(authContext?.authState?.id);
        }
        setLoading(false);
    }, [isFocused, navigation]);

    if (authContext?.authState?.authenticated === false) {
        return <Login />;
    } else {
        return (
            <View style={styles.screenContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {loading === false ? (
                        <AccountDetails navigation={navigation} uid={userId}/>
                    ) : (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large"/>
                        </View>
                    )}
                </ScrollView>
                <StatusBar style="auto"/>
            </View>
        );
    }
}

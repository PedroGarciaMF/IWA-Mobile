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
import {styles, backgroundStyle, isDarkMode} from '../Styles';
import {AuthContext} from '../context/AuthContext';
import {useIsFocused, useTheme} from '@react-navigation/native';

import Login from './Login';

export default function Account({navigation}) {
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();
    const {colors} = useTheme();

    useEffect(() => {
        setLoading(false);
    }, [isFocused, navigation]);

    if (authContext?.authState?.authenticated === false) {
        return <Login />;
    } else {
        return (
            <View style={styles.screenContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {loading === false ? (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>Account Screen</Text>
                            </View>
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

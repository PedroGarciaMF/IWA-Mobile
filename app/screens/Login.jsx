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

import {Alert, Button, Image, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value);
        } catch (e) {
            // saving error
        }
    };

    const getData = async () => {
        try {
            return await AsyncStorage.getItem('@storage_Key');
        } catch (e) {
            // error reading value
        }
    };

    const onLogin = async () => {
        console.log(`Attempting to login user "${email}" with password "${password}"`);
        try {
            const response = await publicAxios.post('/site/sign-in', {
                username: email,
                password: password,
            });

            const {id, accessToken, refreshToken} = response.data;
            authContext.setAuthState({
                id,
                accessToken,
                refreshToken,
                authenticated: true,
            });
            console.log(`Logged in successfully, retrieved accessToken "${accessToken}"`);

            // this is bad
            await storeData(JSON.stringify({
                email,
                password,
            }));
            const data = await getData();
            console.log(JSON.parse(data));

            // this is better
            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({
                    id,
                    accessToken,
                    refreshToken,
                }),
            );
        } catch (error) {
            Alert.alert('Login Failed', error.response.data.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo}
                   source={require('../assets/img/login_logo.png')}
            />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#ccc"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>
            <Button title="Login" style={styles.button} onPress={() => onLogin()}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    logo: {
        margin: '10%',
    },
    form: {
        width: '80%',
        margin: '10%',
    },
    input: {
        fontSize: 20,
        color: '#000',
        paddingBottom: 10,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    button: {},
});

export default Login;

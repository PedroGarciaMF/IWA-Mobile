import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Button,
    Alert, Image,
} from 'react-native';
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
    }

    const getData = async () => {
        try {
            return await AsyncStorage.getItem('@storage_Key');
        } catch (e) {
            // error reading value
        }
    }

    const onLogin = async () => {
        console.log(`Attempting to login user "${email}" with password "${password}"`)
        try {
            const response = await publicAxios.post('/site/sign-in', {
                username: email,
                password: password,
            });

            const {accessToken, refreshToken} = response.data;
            authContext.setAuthState({
                accessToken,
                refreshToken,
                authenticated: true,
            });
            console.log(`Logged in successfully, retrieved accessToken "${accessToken}"`)

            // this is bad
            await storeData(JSON.stringify({
                email,
                password,
            }));
            // this is better
            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({
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
            <Button title="Login" style={styles.button} onPress={() => onLogin()} />
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

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

import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, ScrollView, Text, View, Alert, TouchableOpacity} from 'react-native';
import {ListItem, Button } from 'react-native-elements';
import { NumericFormat } from 'react-number-format';

import '../Global.js';
import {windowWidth} from '../Styles';

import UserService from '../services/UserService.js';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';

export default function AccountDetails({navigation, uid}) {
    const authContext = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        UserService.getUser(uid).then(data => {
            if (typeof data !== 'undefined') {
                setData(data);
            } else {
                console.log(`Error: unable to retrieve data for uid: ${uid}`);
                Alert.alert(
                    'Error',
                    'Unable to retrieve data for user with uid: ' + uid,
                    [
                           {text: 'OK'},
                    ]
                );
            }
            setLoading(false);
        });
    }, [])

    const handlePick = item => {
        switch (item) {
            case 'logout':
                console.log('logging out');
                authContext.logout();
                break;
            case 'not-yet-implemented':
                Alert.alert(
                    'Not yet Implemented',
                    'This application is a work in progress and this feature has not yet been implemented - please be patient.',
                    [
                           {text: 'OK'},
                    ]
                )
                break;
            default:
                break;
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: windowWidth,
        },
        sectionTitle: {
            textTransform: 'uppercase',
            fontSize: 14,
            color: 'blue',
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 10
        },
        sTopPad: {
            paddingTop: 5
        },
        lTopPad: {
            paddingTop: 20
        },
        lChevron: {
            fontSize: 24,
            color: '#444',
            fontWeight: 'bold'
        }
    });

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView>
                    <ListItem style={styles.lTopPad}>
                        <ListItem.Content>
                            <ListItem.Title>Welcome back, {data.firstName}</ListItem.Title>
                            <View>
                                  <Text>{data.email}</Text>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                    <Text style={styles.sectionTitle}>Billing & Delivery Address</Text>
                    <ListItem style={styles.sTopPad} onPress={() => handlePick("not-yet-implemented")}>
                        <ListItem.Content>
                            <View>
                                <Text>{data.address}</Text>
                                <Text>{data.city}</Text>
                                <Text>{data.zip}</Text>
                                <Text>{data.country}</Text>
                            </View>
                        </ListItem.Content>
                        <ListItem.Chevron iconStyle={styles.lChevron}/>
                    </ListItem>
                    <ListItem style={styles.sTopPad} onPress={() => handlePick("not-yet-implemented")}>
                        <ListItem.Content style={{flex: 1}}>
                            <ListItem.Title>Change Delivery Address</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron iconStyle={styles.lChevron} />
                    </ListItem>
                    <ListItem style={styles.lTopPad} onPress={() => handlePick("not-yet-implemented")}>
                        <ListItem.Content>
                            <ListItem.Title style={{color: 'red'}}>Close Account</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem style={styles.sTopPad} onPress={() => handlePick("logout")}>
                        <ListItem.Content>
                            <ListItem.Title style={{color: 'red'}}>Sign Out</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </ScrollView>
            ) : (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    );
}

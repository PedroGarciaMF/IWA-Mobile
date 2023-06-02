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
import {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, Image, Modal, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../Styles';
import {AuthContext} from '../context/AuthContext';
import _ from 'underscore';
import {useFocusEffect} from '@react-navigation/native';

import Login from './Login';

class LinkVisiblity {
    static LoggedIn = new LinkVisiblity('loggedin');
    static LoggedOut = new LinkVisiblity('loggedout');
    static Always = new LinkVisiblity('always');

    constructor(name) {
        this.name = name;
    }
}

const defaultLinks = [
    {id: '1', icon: 'building', text: 'Find Store', visibility: LinkVisiblity.Always},
    {id: '10', icon: 'sign-in', text: 'Sign In', visibility: LinkVisiblity.LoggedOut},
    {id: '11', icon: 'sign-out', text: 'Sign Out', visibility: LinkVisiblity.LoggedIn},
    {id: '12', icon: 'history', text: 'Order History', visibility: LinkVisiblity.LoggedIn},
    {id: '52', icon: 'question-circle', text: 'Help', visibility: LinkVisiblity.Always},
    {id: '53', icon: 'file-text', text: 'Legal', visibility: LinkVisiblity.Always},
    {id: '54', icon: 'commenting', text: 'Feedback', visibility: LinkVisiblity.Always},
    {id: '99', icon: 'info-circle', text: 'About', visibility: LinkVisiblity.Always},
];

export default function More({navigation}) {
    const [listItems, setListItems] = useState(defaultLinks);
    const [loginRequired, setLoginRequired] = useState(false);
    const isFocused = useIsFocused();
    const authContext = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            getLinkVisibility();
        }, [authContext]),
    );

    useEffect(() => {

    }, [isFocused]);

    function getLinkVisibility() {
        if (authContext?.authState?.authenticated === true) {
            setListItems(_.filter(listItems, function (item) {
                return item.visibility === LinkVisiblity.Always || item.visibility === LinkVisiblity.LoggedIn;
            }));
        } else {
            setListItems(_.filter(listItems, function (item) {
                return item.visibility === LinkVisiblity.Always || item.visibility === LinkVisiblity.LoggedOut;
            }));
        }
    }

    function handlePick(item) {
        switch (item.text) {
            case 'Sign In':
                console.log('logging in');
                setListItems(defaultLinks);
                setLoginRequired(true);
                break;
            case 'Sign Out':
                console.log('logging out');
                setListItems(defaultLinks);
                authContext.logout();
                setLoginRequired(false);
                break;
            default:
        }
    }

    const _renderItem = ({item}) => {
        return (
            <View style={styles.listItemView}>
                <TouchableOpacity style={styles.homeButton} activeOpacity={.5}
                                  onPress={() => handlePick(item)}>
                    <View style={styles.stateView}>

                        <Text style={styles.textItem}>
                            <Icon name={item.icon} size={20} color="#4F8EF7" iconStyle={{padding: 20}}/> {item.text}
                        </Text>
                        <Image source={require('../assets/img/icons8-chevron-right-24.png')}
                               style={{marginLeft: 100, marginTop: 5, width: 25, height: 25}}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const itemSeparator = () => {
        return (
            <View
                style={{
                    borderBottomWidth: 2,
                    borderColor: '#C8C8C8',
                }}
            />
        );
    };

    return (
        <View style={styles.screenContainer}>
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={authContext?.authState?.authenticated === false && loginRequired === true}
            >
                <Login/>
            </Modal>
            <FlatList
                style={styles.listContainer}
                data={listItems}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={itemSeparator}
                renderItem={({item}) => _renderItem({item})}
            />
            <StatusBar style="auto"/>
        </View>
    );
}

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
import {FlatList, Image, Modal, StatusBar, Text, TouchableOpacity, View, Alert} from 'react-native';
import {ListItem, Button } from 'react-native-elements';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../Styles';
import {AuthContext} from '../context/AuthContext';
import _ from 'underscore';

import Login from './Login';

class LinkVisiblity {
    static LoggedIn = new LinkVisiblity('loggedin');
    static LoggedOut = new LinkVisiblity('loggedout');
    static Always = new LinkVisiblity('always');

    constructor(name) {
        this.name = name;
    }
}

const links = [
    {id: '1', icon: 'building', text: 'Find Store', visibility: LinkVisiblity.Always},
    {id: '12', icon: 'history', text: 'Order History', visibility: LinkVisiblity.LoggedIn},
    {id: '52', icon: 'question-circle', text: 'Help', visibility: LinkVisiblity.Always},
    {id: '53', icon: 'file-text', text: 'Legal', visibility: LinkVisiblity.Always},
    {id: '54', icon: 'commenting', text: 'Feedback', visibility: LinkVisiblity.Always},
    {id: '99', icon: 'info-circle', text: 'About', visibility: LinkVisiblity.Always},
];

export default function More({navigation}) {
    const [listItems, setListItems] = useState(links);
    const [loginRequired, setLoginRequired] = useState(false);
    const isFocused = useIsFocused();
    const authContext = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            getLinkVisibility();
        }, [authContext]),
    );

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

    const handlePick = item => {
        switch (item.text) {
            case 'Log Out':
                console.log('logging out');
                authContext.logout();
                break;
            case 'not-yet-implemented':
            case 'Find Store':
            case 'Order History':
            case 'Help':
            case 'Legal':
            case 'Feedback':
                Alert.alert(
                    'Not yet Implemented',
                    'This application is a work in progress and this feature has not yet been implemented - please be patient.',
                    [
                           {text: 'OK'},
                    ]
                )
                break;
            case 'About':
                Alert.alert(
                    'About',
                    'IWA-Mobile is an insecure React Native mobile application for use in Fortify by Opentext demonstrations.',
                    [
                           {text: 'OK'},
                    ]
                )
                break;
            default:
                break;
        }
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
            <View style={styles.listContainer}>
              {
                links.map((item, i) => (
                  <ListItem key={i} bottomDivider style={styles.listItemView} onPress={() => handlePick(item)}>
                    <Icon name={item.icon} size={24} color="#4F8EF7" iconStyle={{padding: 20}}/>
                    <ListItem.Content>
                      <ListItem.Title>{item.text}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron iconStyle={styles.lChevron}/>
                  </ListItem>
                ))
              }
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}
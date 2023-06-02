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

import React from 'react';
import {View} from 'react-native';
import {styles} from '../Styles'

import '../Global.js';
import SearchProducts from '../components/SearchProducts';

export default function Search({navigation}) {
    return (
        <View style={styles.screenContainer}>
            <View>
                <SearchProducts navigation={navigation} maxProducts={50}/>
            </View>
        </View>
    );
}

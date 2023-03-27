import React from 'react';
import {Button, View} from 'react-native';

import {styles} from '../Styles';
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

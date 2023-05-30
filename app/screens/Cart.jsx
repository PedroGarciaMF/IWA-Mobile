import * as React from 'react';
import {View} from 'react-native';
import {styles} from '../Styles';

import '../Global.js';
import ShoppingCart from '../components/ShoppingCart';

export default function Cart({navigation}) {
    return (
        <View style={styles.screenContainer}>
            <View>
                <ShoppingCart navigation={navigation} />
            </View>
        </View>
    );
}


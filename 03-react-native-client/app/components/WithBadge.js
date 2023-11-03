/*
        IWA-Mobile - Insecure React Native mobile application

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
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {NumericFormat} from 'react-number-format';

import '../Global.js';
import ProductsService from '../services/ProductsService.js';
import {windowWidth} from '../Styles';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import {Badge} from 'react-native-elements';

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9,
    height: 18,
    minWidth: 0,
    width: 18
  },
  badgeContainer: {
    position: 'absolute',
  },
  badgeText: {
    fontSize: 10,
    paddingHorizontal: 0,
  },
});

const withBadge =
  (value, options = {}) =>
  WrappedComponent =>
    class extends React.Component {
      render() {
        const {
          top = -8,
          right = -14,
          left = 0,
          bottom = 0,
          hidden = !value,
          ...badgeProps
        } = options;
        const badgeValue =
          typeof value === 'function' ? value(this.props) : value;
        return (
          <View>
            <WrappedComponent {...this.props} />
            {!hidden && (
              <Badge
                badgeStyle={styles.badge}
                textStyle={styles.badgeText}
                value={badgeValue}
                status="error"
                containerStyle={[
                  styles.badgeContainer,
                  {top, right, left, bottom},
                ]}
                {...badgeProps}
              />
            )}
          </View>
        );
      }
    };

export default withBadge;

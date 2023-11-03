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

import React, {createContext, useState, useEffect} from 'react';

import ProductsService from '../services/ProductsService.js';
import _ from 'underscore';

const CartContext = createContext(null);
const {Provider} = CartContext;

const CartProvider = ({children}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    _(items).each(item => {
      console.log(
        `item: ${item._id}, qty: ${item.qty}, totalPrice: ${item.totalPrice}, product: ${item.product.name}`,
      );
    });
  }, [items]);

  const addItemToCart = (pid) => {
    console.log(`CartContext::addItemToCart: adding product id: ${pid} to cart`);
    /*var crypto = require('crypto');
    var encryptionKey = '';
    var algorithm = 'aes-256-ctr';
    var cipher = crypto.createCipher(algorithm, encryptionKey);*/
    ProductsService.getProduct(pid).then(product => {
      //console.log('INSIDE DATA', product);
      const p_id = product._id;
      setItems(prevItems => {
        const item = prevItems.find(item => item.pid == p_id);
        if (!item) {
          //console.log('adding new item');
          return [
            ...prevItems,
            {
              pid,
              qty: 1,
              product,
              totalPrice: product.price,
            },
          ];
        } else {
          //console.log('updating item quantity');
          return prevItems.map(item => {
            if (item.pid == pid) {
              item.qty++;
              item.totalPrice += product.price;
            }
            return item;
          });
        }
      });
    });
  };

  const getItems = () => {
    return items;
  };

  const getItemsCount = () => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <Provider
      value={{
        items,
        setItems,
        getItemsCount,
        addItemToCart,
        getTotalPrice,
      }}>
      {children}
    </Provider>
  );
};

export {CartContext, CartProvider};

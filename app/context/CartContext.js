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
        `item: ${item.id}, qty: ${item.qty}, totalPrice: ${item.totalPrice}, product: ${item.product.name}`,
      );
    });
  }, [items]);

  const addItemToCart = ({id}) => {
    console.log(`Adding product id: ${id} to cart`);
    ProductsService.getProduct(id).then(product => {
      //console.log('INSIDE DATA', product);
      const pid = product.id;
      setItems(prevItems => {
        const item = prevItems.find(item => item.id == id);
        if (!item) {
          //console.log('adding new item');
          return [
            ...prevItems,
            {
              id,
              qty: 1,
              product,
              totalPrice: product.price,
            },
          ];
        } else {
          //console.log('updating item quantity');
          return prevItems.map(item => {
            if (item.id == id) {
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

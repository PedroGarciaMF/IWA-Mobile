/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app/app.json';
import {AuthProvider} from './app/context/AuthContext';
import {AxiosProvider} from './app/context/AxiosContext';
import {CartProvider} from './app/context/CartContext';

const Root = () => {
  return (
    <AuthProvider>
      <AxiosProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AxiosProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);

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

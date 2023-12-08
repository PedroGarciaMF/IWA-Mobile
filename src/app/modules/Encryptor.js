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

import {NativeModules} from 'react-native';

const Encryptor = NativeModules.Encryptor;

export const encrypt = (plainText) => {
  // Add your additional custom logic here
  return Encryptor.encrypt(plainText);
};

export const decrypt = (encrptedText) => {
  // Add your additional custom logic here
  return Encryptor.decrypt(encrptedText);
};
// You can directly export this and access it
// like Encryptor.enrypt/Encryptor.decrypt
export default Encryptor;

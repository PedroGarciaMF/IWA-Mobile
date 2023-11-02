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

import axios from 'axios';
import '../Global.js';

import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';

const UserService = {
  getUser: async function (uid = '') {
    console.log(`UserService::getUser: retrieving user id: ${uid}`);
    try {
      const response = await axios.get(
        `${global.API_BASE}/users/${uid}`
      );
      //console.log(`UserService::getUser: response:`); console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(`UserService::getUser: ${error}`);
    }
  },

  getUnreadMessageCount: async function (uid) {
    console.log(
      `UserService::getUnreadMessageCount: retrieving messages for user id: ${uid}`,
    );
    try {
      const response = await axios.get(
        `${global.API_BASE}/messages/unread-count/${uid}`,
      );
      //console.log(`UserService::getUnreadMessageCount: response: ${response.data}`);
      return response.data;
    } catch (error) {
      console.log(`UserService::getUnreadMessageCount: ${error}`);
    }
  },

};

export default UserService;

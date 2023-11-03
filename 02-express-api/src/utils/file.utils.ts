/*
        IWA-Express - Insecure Express JS REST API

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

import fs from "fs";
import {SubscribingUser} from "../common/types";
import child_process from "child_process";
import Logger from "../middleware/logger";

export abstract class FileUtils {

    private static newsletterFile = "email-db.json";

    public static updateNewsletterDb(userObj: SubscribingUser) {
        // check if the file is writable.
        fs.access(this.newsletterFile, fs.constants.W_OK, (err) => {
            if (!err) {
                // read file if it exists
                fs.readFile(this.newsletterFile, (err, data) => {
                    if (err) throw err;
                    let users = []
                    if (data) {
                        users = JSON.parse(data.toString('utf8'));
                    }
                    // add new user
                    users.push(userObj);
                    // write all users
                    fs.writeFile(this.newsletterFile, JSON.stringify(users), (err) => {
                        if (err) throw err;
                        Logger.debug('Email database updated.');
                    });
                });
            } else {
                let users = [];
                users.push(userObj);
                let data = JSON.stringify(users);
                // write new users
                fs.writeFile(this.newsletterFile, data, (err) => {
                    if (err) throw err;
                    Logger.debug('Email database created.');
                });
            }
        });
    }

    public static backupNewsletterDb(backupFile: String) {
        child_process.exec(
            `gzip ${FileUtils.newsletterFile} ${backupFile} `,
            function (err, data) {
                if (err) throw err;
                Logger.debug(`Email database backed up to ${backupFile}.`);
            }
        );
    }
}

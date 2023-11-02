import fs from "fs";
import {SubscribingUser} from "../common/types";
import child_process from "child_process";

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
                        console.log('Email database updated.');
                    });
                });
            } else {
                let users = []; users.push(userObj);
                let data = JSON.stringify(users);
                // write new users
                fs.writeFile(this.newsletterFile, data, (err) => {
                    if (err) throw err;
                    console.log('Email database created.');
                });
            }
        });
    }

    public static backupNewsletterDb(backupFile: String) {
        child_process.exec(
            `gzip ${FileUtils.newsletterFile} ${backupFile} `,
            function (err, data) {
                if (err) throw err;
                console.log(`Email database backed up to ${backupFile}.`);
            }
        );
    }
}

var crypto = require('crypto-browserify')

import Logger from "../middleware/logger";

export abstract class EncryptUtils {

    static encryptionKey = "";
    static algorithm = 'aes-256-ctr';

    public static cryptPassword(password: String): String {
        Logger.debug(`Encrypting password: ${password}`);
        var cipher = crypto.createCipher(this.algorithm, this.encryptionKey);
        var mystr = cipher.update(password, 'utf8', 'hex');
        mystr += cipher.final('hex');
        Logger.debug(`Encrypted password: ${mystr}`);
        return mystr;
    }

    public static decryptPassword(hashPassword: String): String {
        Logger.debug(`Decrypting password: ${hashPassword}`);
        var cipher = crypto.createDecipher(this.algorithm, this.encryptionKey);
        var mystr = cipher.update(hashPassword, 'hex', 'utf8');
        mystr += cipher.final('utf8');
        return mystr;
    }

    public static comparePassword(password: String, hashPassword: String): Boolean {
        Logger.debug(`Encrypted password: ${hashPassword}`);
        var cipher = crypto.createDecipher(this.algorithm, this.encryptionKey);
        var mystr = cipher.update(hashPassword, 'hex', 'utf8');
        mystr += cipher.final('utf8');
        Logger.debug(`Comparing passwords: ${mystr} = ${password}`);
        return (password == mystr);
    }

}

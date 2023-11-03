import {NextFunction, Request, Response} from 'express';
import {
    insufficientParameters,
    mongoError,
    successResponse,
    failureResponse,
    unauthorised
} from '../modules/common/service';
import { IUser } from '../modules/users/model';
import { EncryptUtils } from "../utils/encrypt.utils";

import Logger from "../middleware/logger";

import UserService from '../modules/users/service';

import {AuthenticationHandler} from "../middleware/authentication.handler";
import {SubscribingUser} from "../common/types";

import * as fs from "fs";
import {FileUtils} from "../utils/file.utils";
import * as url from "url";
import {File} from "buffer";
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const jQuery = require( "jquery" )( window );

export class SiteController {

    private user_service: UserService = new UserService();

    public login_user(req: Request, res: Response) {
        Logger.debug(`Logging in user with with request body: ${JSON.stringify(req.body)}`);
        // this check whether all the fields were sent through the request or not
        if (req.body.email && req.body.password) {
            const hashPassword = EncryptUtils.cryptPassword(req.body.password);
            const user_filter = {email: req.body.email, password: hashPassword};
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if (user_data) {
                        successResponse('Successfully logged in user', AuthenticationHandler.createJWT(user_data), res);
                    } else {
                        unauthorised('Invalid credentials', res);
                    }
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public subscribe_user(req: Request, res: Response) {
        Logger.debug(`Subscribing user with details: ${JSON.stringify(req.body)}`);
        let userObj = <SubscribingUser>{};

        if (req.body.email !== null) {
            userObj = jQuery.parseJSON(`
                {
                    "firstName": "${req.body.first_name}",
                    "lastname": "${req.body.last_name}",
                    "email": "${req.body.email}",
                    "role": "user" 
                }
            `);
        }

        try {
            FileUtils.updateNewsletterDb(userObj);
        } catch (err) {
            failureResponse(`Error updating newsletter database: ${err}`, null, res);
        }

        successResponse('Successfully updated newsletter database', null, res);
    }

    public backup_newsletter_db(req: Request, res: Response) {
        Logger.debug(`Backing up newsletter database with details: ${req.params}`)
        try {
            FileUtils.backupNewsletterDb(<String>req.query.file_path)
        } catch (err) {
            failureResponse(`Error backing up newsletter database: ${err}`, null, res);
        }

        successResponse('Successfully backed up newsletter database', null, res);

    }

}

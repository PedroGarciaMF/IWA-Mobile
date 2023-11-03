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

import Logger from "./logger";
import {IUser} from "../modules/users/model";
import jwt from "jsonwebtoken";
import config from "config";
import {JwtJson} from "../common/types";
import {NextFunction, Request, Response} from "express";
import {forbidden, unauthorised} from "../modules/common/service";

const jwtSecret: string = config.get('App.jwtSecret') || "changeme";
const jwtExpiration: number = config.get('App.jwtExpiration') || 36000;

export class AuthenticationHandler {

    public static createJWT(user_data: IUser): JwtJson {
        console.log(`Creating JWT authentication token using secret: ${jwtSecret}`);
        const accessToken = jwt.sign({id: user_data._id, email: user_data.email}, jwtSecret, {
            expiresIn: '1h',
        })
        const refreshToken = jwt.sign({id: user_data._id, email: user_data.email}, jwtSecret, {
            expiresIn: '1d',
        })
        console.log(`Created accessToken: ${accessToken}`);
        console.log(`Created refreshToken: ${refreshToken}`);
        return {
            id: user_data._id,
            email: user_data.email,
            accessToken: accessToken,
            refreshToken: refreshToken,
            tokenExpiration: jwtExpiration,
            tokenType: 'Bearer'
        }
    }

    public static verifyJWT(req: Request, res: Response, next: NextFunction) {
        console.log(`Verifying JWT authentication token using secret ${jwtSecret}`);
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            console.log(`JWT authentication token is: ${token}`);
            jwt.verify(token, jwtSecret, (err: any, data: any) => {
                if (err) {
                    Logger.error(err);
                    forbidden(`The JWT authentication token has expired`, res);
                }
                if (req.session) {
                    req.session.userId = (<any>data).id;
                    req.session.email = (<any>data).email;
                }
                next();
            });
        } else {
            unauthorised("Missing or invalid authentication token", res);
        }
    }

}

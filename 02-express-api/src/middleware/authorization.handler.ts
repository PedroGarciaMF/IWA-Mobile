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
import {NextFunction, Request, Response} from "express";
import {forbidden} from "../modules/common/service";

export class AuthorizationHandler {

    public static permitAll(req: Request, res: Response, next: NextFunction) {
        next();
    }

    public static permitSelf(req: Request, res: Response, next: NextFunction) {
        Logger.debug(`Verifying if user has authorization to self endpoint: '${req.url}`);
        const userId = req.session.userId;
        const email = req.session.email;
        const role = req.session.role;
        if (role == 'admin' || (userId && req.url.includes(userId.toString()))) {
            Logger.debug(`UserId: '${userId}' has permission to access the endpoint: '${req.url}'`);
            next();
        } else {
            Logger.debug(`UserId '${userId}' does not have permission to access the endpoint: '${req.url}'`);
            forbidden(`User '${userId}' does not have permission to access the endpoint: '${req.url}'`, res);
        }
    }

    public static permitAdmin(req: Request, res: Response, next: NextFunction) {
        Logger.debug(`Verifying if user has authorization to admin endpoint: '${req.url}`);
        Logger.debug(`Session is: ${JSON.stringify(req.session)}`)
        const userId = req.session.userId;
        const email = req.session.email;
        const role = req.session.role;
        if (role == 'admin') {
            Logger.debug(`User: '${email}' has permission to access the endpoint: '${req.url}'`);
            next();
        } else {
            Logger.debug(`User '${email}' does not have permission to access the endpoint: '${req.url}'`);
            forbidden(`User '${email}' does not have permission to access the endpoint: '${req.url}'`, res);
        }
    }

}

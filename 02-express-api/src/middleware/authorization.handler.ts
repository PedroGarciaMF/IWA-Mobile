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

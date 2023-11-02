import Logger from "./logger";
import {IUser} from "../modules/users/model";
import jwt from "jsonwebtoken";
import config from "config";
import moment from 'moment';
import {JwtJson} from "../common/types";
import {NextFunction, Request, Response} from "express";
import {forbidden, unauthorised} from "../modules/common/service";

const jwtSecret: string = config.get('App.jwtSecret') || "changeme";
const jwtExpiration: number = config.get('App.jwtExpiration') || 36000;

export class AuthenticationHandler {

    public static createJWT(user_data: IUser): JwtJson {
        console.log(`Creating JWT authentication token using secret: ${jwtSecret}`);
        const expiryDate = moment().add(jwtExpiration).seconds();
        const token = jwt.sign({userId: user_data._id, email: user_data.email, role: (user_data.is_admin ? 'admin' : 'user')}, jwtSecret, {
            expiresIn: jwtExpiration,
        })
        return {
            userId: user_data._id,
            email: user_data.email,
            role: user_data.is_admin ? 'admin' : 'user',
            token: token,
            expires: expiryDate
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
                    req.session.userId = (<any>data).userId;
                    req.session.email = (<any>data).email;
                    req.session.role = (<any>data).role;
                }
                next();
            });
        } else {
            unauthorised("Missing or invalid authentication token", res);
        }
    }

}

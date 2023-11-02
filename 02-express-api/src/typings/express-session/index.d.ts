import "express-session";
import {ObjectID} from "mongodb";

declare module "express-session" {
    interface SessionData {
        userId: ObjectID,
        email: string,
        role: string,
    }
}

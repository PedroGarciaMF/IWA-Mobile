import express from 'express';
import session from 'express-session';
import config from 'config';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";

import Logger from "../middleware/logger";
import morganConfig from './morgan.config'
import swaggerOutput from './swagger_output.json';

import {siteRoutes} from "../routes/site.routes";
import {userRoutes} from "../routes/user.routes";
import {productRoutes} from "../routes/product.routes";
import {commonRoutes} from "../routes/common.routes";

class AppConfig {
    public app: express.Application;

    public apiVersion: string = config.get('App.apiConfig.version') || 'v1';
    private dbHost: string = config.get('App.dbConfig.host') || 'localhost';
    private dbPort: number = config.get('App.dbConfig.port') || 27017;
    private dbName: string = config.get('App.dbConfig.database') || 'iwa';
    public mongoUrl: string = `mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`;

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup().then(r => Logger.info(`Connected to ${this.mongoUrl}`));

        this.app.use(siteRoutes);
        this.app.use(userRoutes);
        this.app.use(productRoutes);
        this.app.use(commonRoutes); // always needs to be last
    }

    async mongoSetup(): Promise<void> {
        try {
            const conn = await mongoose.connect(this.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
        } catch (error) {
            Logger.error(error);
            process.exit(1);
        }
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({extended: false}));
        // configure morganConfig logger
        this.app.use(morganConfig);
        // configure session handling
        this.app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }))
        // configure helmet
        this.app.use(helmet({
            ieNoOpen: false
        }));
        this.app.use(helmet.xssFilter({
            setOnOldIE: true})
        );
        // configure swagger API
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
    }
}

export default new AppConfig().app;

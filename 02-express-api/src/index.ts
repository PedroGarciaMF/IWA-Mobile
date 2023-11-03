import config from 'config';

import app from "./configs/app.config";
import Logger from "./middleware/logger";
import fs from "fs";

global.__basedir = __dirname;
if (fs.existsSync('./src')) { // src only exists in development
  global.__basedir = require('path').resolve(global.__basedir, '..')
}

const appName: string = config.get('App.name') || "IWA-Express";
const appPort: number = config.get('App.port') || 8000;
const apiUrl: string = config.get('App.apiConfig.url') || "http://localhost:3000/api-docs/";

app.listen(appPort, () => {
  Logger.debug(`Running in directory: ${global.__basedir}`);
  Logger.info(`${appName} API is online at ${apiUrl}`);
});

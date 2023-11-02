import config from 'config';

import app from "./configs/app.config";
import Logger from "./middleware/logger";

const appName: string = config.get('App.name') || "IWA-Express";
const appPort: number = config.get('App.port') || 8000;
const apiUrl: string = config.get('App.apiConfig.url') || "http://localhost:3000/api-docs/";

app.listen(appPort, () => {
  Logger.info(`${appName} API is online at ${apiUrl}`);
});

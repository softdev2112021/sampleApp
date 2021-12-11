import { createLogger, format } from "winston";
import BrowserConsole from "winston-transport-browserconsole";

import config from "config";

const logger = createLogger({
  transports: [
    new BrowserConsole({
      format: format.simple(),
      level: config.loggerMode,
    }),
  ],
});

export default logger;

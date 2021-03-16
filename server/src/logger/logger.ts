import { utilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;

const output = {
  console: new transports.Console({
    format: format.combine(timestamp(), utilities.format.nestLike()),
  }),
  file: new transports.DailyRotateFile({
    filename: 'ForecasticApp-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
  }),
};

const logger = WinstonModule.createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
    printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`,
    ),
  ),
  transports: [output.console, output.file],
});

if (process.env.NODE_ENV === 'production') {
  output.console.level = 'warn';
  output.file.level = 'warn';
}

export default logger;

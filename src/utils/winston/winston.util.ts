import * as winstonDaily from 'winston-daily-rotate-file'
import * as winston from 'winston'
import { WinstonModule, utilities } from 'nest-winston'

const logDir = 'logs'

const createDailyLogFile = (
  level: string,
): winstonDaily.DailyRotateFileTransportOptions => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.json(),
    ),
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: '7d',
    maxSize: '20m',
    zippedArchive: true,
  }
}

const color = {
  error: 'red',
}

winston.addColors(color)

// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'error',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        utilities.format.nestLike(process.env.SITE_NAME, {
          prettyPrint: true,
        }),
      ),
    }),

    new winstonDaily(createDailyLogFile('error')),
  ],
})

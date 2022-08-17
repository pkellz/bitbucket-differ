import winston from 'winston';
const MESSAGE = Symbol.for('message');
const ignoreFormat = (logEntry: { ignoreLogs: any}) => logEntry.ignoreLogs ? false : logEntry;
const jsonFormat: ((logEntry: string) => void) = logEntry => {
  const base = { timestamp: new Date() };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

const [ignore, json] = [ignoreFormat, jsonFormat].map(fn => winston.format(fn));

export class Logger {
  private static instance: Logger;

  public static getInstance(): any {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        'transports': [
          new winston.transports.Console()
        ],
        format: winston.format.combine(ignore(), json()),
      });
    }
    return Logger.instance;
  }
}
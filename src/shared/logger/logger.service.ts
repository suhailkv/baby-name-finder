import { Injectable, LoggerService, Scope } from '@nestjs/common';
import winston, { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file'; 
import * as CONSTANTS from '../../constants/app.constants'
import * as path from 'path'
@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger implements LoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = createLogger({
        transports: [
            new transports.DailyRotateFile({
                filename: path.join('logs', CONSTANTS.LOG_FILE_NAME),
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: CONSTANTS.LOG_FILE_MAX_SIZE,
                maxFiles: CONSTANTS.LOG_FILE_MAX_SIZE,
                format: format.combine(
                    format.timestamp(),   
                    format.printf( this.logFormat)
                )
            }),
        ]
        });
    }
    private logFormat(info: any) {
        return `{"timestamp":"${info.timestamp}", "level":"${info.level}","message":${JSON.stringify(info.message)}${info.context ? `,"context":"${info.context}"` : ''}${info.stack ? `,"stack":"${info.stack}"` : ''}}`;
    }

    log(message: any, context?: string) {
        this.logger.log('info', message, { context });
    }

    error(message: any, trace?: string, context?: string) {
        const stack = trace || this.getStackTrace(); 
        this.logger.error(message, { stack, context });
    }

    warn(message: any, context?: string) {
        this.logger.warn(message, { context });
    }

    private getStackTrace(): string {
        try {
            throw new Error();
        } catch (e: any) {
            return e.stack || '';
        }
    }
}

import * as winston from 'winston';
import {Logger} from 'winston';
import SYMBOLS from '../dependency-injection/Symbols';
import {provide} from 'inversify-binding-decorators';
import {Environment} from '../model/Environment';

@provide(SYMBOLS.LoggerFactory)
export class LoggerFactory {
    create(environment: Environment): Logger {
        let logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.colorize({all: true}),
                        winston.format.timestamp(),
                        winston.format.simple()
                    ),
                }),
            ],
        });
        if (environment === Environment.prod) {
            logger = winston.createLogger({
                transports: [
                    new winston.transports.Console({
                        level: 'info',
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            winston.format.json()
                        ),
                    }),
                ],
            });
        } else if (environment === Environment.test) {
            logger = winston.createLogger({
                transports: [
                    new winston.transports.Console({
                        level: 'debug',
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            winston.format.json()
                        ),
                    }),
                ],
            });
        }
        return logger;
    }
}

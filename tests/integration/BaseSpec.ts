import 'source-map-support/register';
import {AxiosInstance} from 'axios';
import Axios from 'axios';
import {Logger} from 'winston';
import * as winston from 'winston';

export class BaseSpec {
    static BASE_HOST = 'http://localhost:3000';
    static API_KEY = 'abcd';

    protected authenticatedApiClient: AxiosInstance;
    protected unAuthenticatedApiClient: AxiosInstance;
    protected logger: Logger;
    before(): void {
        this.logger = winston.createLogger({
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
        this.authenticatedApiClient = Axios.create({
            baseURL: `${BaseSpec.BASE_HOST}/v1/`,
            headers: {
                'x-api-key': BaseSpec.API_KEY,
            },
        });
        this.unAuthenticatedApiClient = Axios.create({
            baseURL: `${BaseSpec.BASE_HOST}/v1/`,
        });
    }

    after() {
    }
}

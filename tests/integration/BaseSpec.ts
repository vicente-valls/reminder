import 'source-map-support/register';
import 'reflect-metadata';
import '../../src/dependency-injection/Loader';
import {AxiosInstance} from 'axios';
import Axios from 'axios';
import {Logger} from 'winston';
import * as winston from 'winston';
import SYMBOLS from '../../src/dependency-injection/Symbols';
import {SQS} from 'aws-sdk';
import {container} from '../../src/dependency-injection/inversify.config';
import * as Promise from 'bluebird';

export class BaseSpec {
    static BASE_HOST = 'http://localhost:3000';
    static API_KEY = 'abcd';

    protected authenticatedApiClient: AxiosInstance;
    protected unAuthenticatedApiClient: AxiosInstance;
    protected logger: Logger;
    protected sqs: SQS;
    before(): Promise<void> {
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
        this.sqs = container.get<SQS>(SYMBOLS.SqsClient);
        return Promise.resolve(
            this.sqs.purgeQueue({QueueUrl: this.sqs.endpoint.href}).promise()
        )
        .then(() => {
            this.logger.debug('queue purged')
        });

    }

    after() {
    }
}

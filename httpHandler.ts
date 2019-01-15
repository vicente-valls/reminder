import 'source-map-support/register';
import 'reflect-metadata';
import './src/dependency-injection/Loader';
import {container} from './src/dependency-injection/inversify.config';
import * as serverless from 'serverless-http';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyparser from 'body-parser';
import * as express from 'express';
import {APIGatewayEvent, Context, ProxyCallback} from 'aws-lambda';
import SYMBOLS from './src/dependency-injection/Symbols';
import {Logger} from 'winston';

const server = new InversifyExpressServer(container);
server.setConfig((application) => {
    application.use(bodyparser.json());
});
server.setErrorConfig((application) => {
    application.use((err, _req, res, next) => {
        const logger = container.get<Logger>(SYMBOLS.Logger);
        logger.error({error: {message: err.message, stack: err.stack}});
        res.status(500).send({
            error: {
                'message': 'internal error',
            },
        });
        next();
    });
});
export interface IRequest extends express.Request {
    requestId: string,
}
const app = server.build();

export function handle(event: APIGatewayEvent, context: Context, callback: ProxyCallback) {
    const serverlessApp = serverless(
        app,
        {
            request: (request, apiEvent: APIGatewayEvent, _context: Context) => {
                request.requestId = apiEvent.requestContext.requestId;
            },
        }
    );
    return serverlessApp(event, context, callback);
}

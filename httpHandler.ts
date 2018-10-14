import 'source-map-support/register';
import 'reflect-metadata';
import './src/dependency-injection/Loader';
import * as serverless from 'serverless-http';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './src/dependency-injection/inversify.config';

const server = new InversifyExpressServer(container);
server.setErrorConfig((application) => {
    application.use((_err, _req, res, next) => {
        // @todo log error
        res.status(500).send({
            error: {
                'message': 'internal error',
            },
        });
        next();
    });
});

const app = server.build();

module.exports.handle = serverless(app);

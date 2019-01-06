import 'source-map-support/register';
import 'reflect-metadata';
import './src/dependency-injection/Loader';
import container from './src/dependency-injection/inversify.config';
import * as serverless from 'serverless-http';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyparser from 'body-parser';

const server = new InversifyExpressServer(container);
server.setConfig((application) => {
    application.use(bodyparser.json());
});
server.setErrorConfig((application) => {
    application.use((err, _req, res, next) => {
        // @todo replace with logging https://github.com/inversify/inversify-express-utils#setconfigconfigfn
        console.error(err.stack);
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

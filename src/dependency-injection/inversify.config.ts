import {Container} from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import {ClassTransformer} from 'class-transformer';
import {Validator} from 'class-validator';
import SYMBOLS from './Symbols';
import {ITaskRepository} from '../model/ITaskRepository';
import {SqsTaskRepository} from '../infrastructure/SqsTaskRepository';
import {Logger} from 'winston';
import {LoggerFactory} from '../service/LoggerFactory';
import {Environment} from '../model/Environment';
import {ISqsConfig} from '../model/ISqsConfig';
import {SQS} from 'aws-sdk';
import {SqsClientFactory} from '../infrastructure/SqsClientFactory';
const container = new Container();

///////////////////
// services
///////////////////
container.bind<ClassTransformer>(SYMBOLS.ClassTransformer).toConstantValue(new ClassTransformer());
container.bind<Validator>(SYMBOLS.ClassValidator).toConstantValue(new Validator());
// @todo bind decorators with interfaces seem to not work properly
container.bind<ITaskRepository>(SYMBOLS.ITaskRepository).to(SqsTaskRepository);
container.bind<Logger>(SYMBOLS.Logger).toConstantValue(
    new LoggerFactory().create(<Environment>process.env.ENVIRONMENT)
);
container.bind<ISqsConfig>(SYMBOLS.SqsConfig).toConstantValue(
    {
        region: process.env.SQS_REGION,
        queueUrl: process.env.SQS_URL,
        accessKeyId: process.env.SQS_ACCESS_KEY_ID,
        secretAccessKey: process.env.SQS_ACCESS_KEY_SECRET,
    }
);
container.bind<SqsClientFactory>(SYMBOLS.SqsClientFactory).to(SqsClientFactory);
container.bind<SQS>(SYMBOLS.SqsClient).toConstantValue(
    container.get<SqsClientFactory>(SYMBOLS.SqsClientFactory).create()
);
container.load(buildProviderModule());
export { container };

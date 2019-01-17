import {ITaskRepository} from '../model/ITaskRepository';
import * as Promise from 'bluebird';
import {Task} from '../model/Task';
import {inject, injectable} from 'inversify';
import SYMBOLS from '../dependency-injection/Symbols';
import {Logger} from 'winston';
import {SQS} from 'aws-sdk';
import {ClassTransformer} from 'class-transformer';
import {ISqsConfig} from '../model/ISqsConfig';

@injectable()
export class SqsTaskRepository implements ITaskRepository {
    constructor(
        @inject(SYMBOLS.SqsClient) private sqsClient: SQS,
        @inject(SYMBOLS.SqsConfig) private sqsConfig: ISqsConfig,
        @inject(SYMBOLS.Logger) private logger: Logger,
        @inject(SYMBOLS.ClassTransformer) private classTransformer: ClassTransformer,
    ) {
    }
    add(task: Task): Promise<void> {
        return Promise.try(() => {
            const params: SQS.Types.SendMessageRequest = {
                MessageBody: this.classTransformer.serialize(task),
                QueueUrl: this.sqsConfig.queueUrl,
            };
            return this.sqsClient.sendMessage(params).promise();
        })
        .then(() => {
            this.logger.debug({
                message: 'task sent',
                task: task,
            })
        });
    }
}

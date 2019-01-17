import {inject, injectable} from 'inversify';
import SYMBOLS from '../dependency-injection/Symbols';
import {ISqsConfig} from '../model/ISqsConfig';
import {SQS} from 'aws-sdk';

@injectable()
export class SqsClientFactory {
    constructor(
        @inject(SYMBOLS.SqsConfig) private sqsConfig: ISqsConfig,
    ) {
    }
    create(): SQS {
        return new SQS({endpoint: this.sqsConfig.queueUrl, region: this.sqsConfig.region});
    }
}

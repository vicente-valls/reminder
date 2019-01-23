import {inject, injectable} from 'inversify';
import SYMBOLS from '../dependency-injection/Symbols';
import {ISqsConfig} from '../model/ISqsConfig';
import {Credentials, SQS} from 'aws-sdk';

@injectable()
export class SqsClientFactory {
    constructor(
        @inject(SYMBOLS.SqsConfig) private sqsConfig: ISqsConfig
    ) {
    }
    create(): SQS {
        const config = {
            endpoint: this.sqsConfig.queueUrl,
            region: this.sqsConfig.region,
        };
        if (this.sqsConfig.accessKeyId && this.sqsConfig.secretAccessKey) {
            config['credentials'] = new Credentials(this.sqsConfig.accessKeyId, this.sqsConfig.secretAccessKey);
        }
        return new SQS(config);
    }
}

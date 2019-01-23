export interface ISqsConfig {
    region: string;
    queueUrl: string;
    accessKeyId?: string|void;
    secretAccessKey?: string|void;
}

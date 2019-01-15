import * as express from 'express';
import {ClassTransformer} from 'class-transformer';
import {ClassType} from 'class-transformer/ClassTransformer';
import {inject} from 'inversify';
import SYMBOLS from '../dependency-injection/Symbols';
import { provide } from 'inversify-binding-decorators';
import {ErrorItem} from '../error/ErrorItem';
import {ApiErrorResponse} from '../dto/ApiErrorResponse';
import {Logger} from 'winston';

@provide(SYMBOLS.ParamConverter)
export class ParamConverter {
    public static readonly PARAM_CONVERTER_PARAM_NAME = 'param-converter';
    constructor(
        @inject(SYMBOLS.ClassTransformer) private classTransformer: ClassTransformer,
        @inject(SYMBOLS.Logger) private logger: Logger
    ) {
    }
    convert<T>(classType: ClassType<T>): express.RequestHandler {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                req.params[ParamConverter.PARAM_CONVERTER_PARAM_NAME] =
                    this.classTransformer.plainToClass<T, Object>(classType, req.body);
                next();
            } catch (error) {
                this.logger.error({error: error});
                res.status(400).json(
                    new ApiErrorResponse(
                        [new ErrorItem('cannot parse as JSON the payload')]
                    )
                );
            }
        };
    }
}

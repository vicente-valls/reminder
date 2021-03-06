import {controller, httpPost, interfaces, request, requestParam, response} from 'inversify-express-utils';
import {ParamConverter} from '../service/ParamConverter';
import SYMBOLS from '../dependency-injection/Symbols';
import {CreateTask} from '../dto/CreateTask';
import * as Promise from 'bluebird';
import * as express from 'express';
import {InvalidDtoError} from '../error/InvalidDtoError';
import {ApiErrorResponse} from '../dto/ApiErrorResponse';
import {ErrorItem} from '../error/ErrorItem';
import {TaskService} from '../service/TaskService';
import {inject} from 'inversify';
import {container} from '../dependency-injection/inversify.config';
import {IRequest} from '../../httpHandler';
import {TaskId} from '../model/TaskId';
import {Logger} from 'winston';

@controller('/v1/task')
export class V1TaskController implements interfaces.Controller {

    constructor(
        @inject(SYMBOLS.TaskService) private taskService: TaskService,
        @inject(SYMBOLS.Logger) private logger: Logger
    ) {
    }

    @httpPost('/', container.get<ParamConverter>(SYMBOLS.ParamConverter).convert(CreateTask))
    public createTask(
        @requestParam(ParamConverter.PARAM_CONVERTER_PARAM_NAME) createTask: CreateTask,
        @request() req: IRequest,
        @response() res: express.Response
    ): Promise<void> {
        return this.taskService.createTask(createTask, new TaskId(req.requestId))
        .then(() => {
            return res.sendStatus(204);
        })
        .catch((error) => {
            this.logger.error({error: error});
            return this.handleError(res, error);
        });
    }

    private handleError(res: express.Response, error: Error) {
        if (error instanceof InvalidDtoError) {
            return res.status(400).json(new ApiErrorResponse(error.errors));
        }
        return res.status(500).json(new ApiErrorResponse([new ErrorItem('internal error')]));
    }
}

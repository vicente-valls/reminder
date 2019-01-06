import {controller, httpPost, interfaces, requestParam, response} from 'inversify-express-utils';
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
import container from '../dependency-injection/inversify.config';

@controller('/v1/task')
export class V1TaskController implements interfaces.Controller {

    constructor(
        @inject(SYMBOLS.TaskService) private taskService: TaskService) {
    }

    @httpPost('/', container.get<ParamConverter>(SYMBOLS.ParamConverter).convert(CreateTask))
    public createTask(
        @requestParam(ParamConverter.PARAM_CONVERTER_PARAM_NAME) createTask: CreateTask,
        @response() res: express.Response
    ): Promise<void> {
        return this.taskService.createTask(createTask)
        .then(() => {
            return res.status(204);
        })
        .catch((error) => {
            // @todo log error
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

import SYMBOLS from '../dependency-injection/Symbols';
import {CreateTask} from '../dto/CreateTask';
import {CustomValidator} from './CustomValidator';
import {inject} from 'inversify';
import * as Promise from 'bluebird';
import { provide } from 'inversify-binding-decorators';

@provide(SYMBOLS.TaskService)
export class TaskService {
    constructor(@inject(SYMBOLS.CustomValidator) private customValidator: CustomValidator) {
    }

    public createTask(createTask: CreateTask): Promise<void> {
        return Promise.try(() => {
            this.customValidator.validateSync(createTask);
        });
    }
}

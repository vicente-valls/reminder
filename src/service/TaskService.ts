import SYMBOLS from '../dependency-injection/Symbols';
import {CreateTask} from '../dto/CreateTask';
import {CustomValidator} from './CustomValidator';
import {inject} from 'inversify';
import * as Promise from 'bluebird';
import { provide } from 'inversify-binding-decorators';
import {Task} from '../model/Task';
import {TaskId} from '../model/TaskId';
import {ITaskRepository} from '../model/ITaskRepository';

@provide(SYMBOLS.TaskService)
export class TaskService {
    constructor(
        @inject(SYMBOLS.CustomValidator) private customValidator: CustomValidator,
        @inject(SYMBOLS.ITaskRepository) private taskRepository: ITaskRepository
    ) {
    }

    public createTask(createTask: CreateTask, taskId: TaskId): Promise<void> {
        return Promise.try(() => {
            this.customValidator.validateSync(createTask);
            const task = new Task(
                taskId, createTask.url, createTask.method, createTask.remindMeAfter,
                (createTask.body) ? createTask.body : null, (createTask.headers) ? createTask.headers : null
            );
            return this.taskRepository.add(task);
        });
    }

    public foo(createTask: CreateTask, taskId: TaskId): Promise<void> {
        return Promise.try(() => {
            this.customValidator.validateSync(createTask);
            const task = new Task(
                taskId, createTask.url, createTask.method, createTask.remindMeAfter,
                (createTask.body) ? createTask.body : null, (createTask.headers) ? createTask.headers : null
            );
            return this.taskRepository.add(task);
        });
    }
}

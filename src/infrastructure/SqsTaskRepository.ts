import {ITaskRepository} from '../model/ITaskRepository';
import * as Promise from 'bluebird';
import {Task} from '../model/Task';
import {injectable} from 'inversify';

@injectable()
export class SqsTaskRepository implements ITaskRepository {
    add(_task: Task): Promise<void> {
        return Promise.resolve(null);
    }
}

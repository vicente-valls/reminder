import {Task} from './Task';
import * as Promise from 'bluebird';

export interface ITaskRepository {
    add(task: Task): Promise<void>;
}

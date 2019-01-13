import {TaskId} from './TaskId';

export class Task {
    constructor(
        public readonly taskId: TaskId,
        public readonly url: string,
        public readonly method: string,
        public readonly remindMeAfter: number,
        public readonly body: Object|null,
        public readonly headers: Object|null
    ) {

    }
}

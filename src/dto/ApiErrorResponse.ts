import {ErrorItem} from '../error/ErrorItem';

export class ApiErrorResponse {
    public readonly errors: ErrorItem[];
    constructor(errors: ErrorItem[]) {
        this.errors = errors;
    }
}

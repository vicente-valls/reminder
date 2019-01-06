import {ErrorItem} from './ErrorItem';

export class InvalidDtoError extends Error {
    public readonly errors: ErrorItem[];
    constructor(errors: ErrorItem[], message: string) {
        super(message);
        this.errors = errors;
        Object.setPrototypeOf(this, InvalidDtoError.prototype);
    }
}

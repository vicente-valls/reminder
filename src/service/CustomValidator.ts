import SYMBOLS from '../dependency-injection/Symbols';
import { provide } from 'inversify-binding-decorators';
import {inject} from 'inversify';
import {ValidationError, Validator} from 'class-validator';
import {ErrorItem} from '../error/ErrorItem';
import {InvalidDtoError} from '../error/InvalidDtoError';
import {Source} from '../error/Source';

@provide(SYMBOLS.CustomValidator)
export class CustomValidator {
    constructor(@inject(SYMBOLS.ClassValidator) private classValidator: Validator) {
    }

    public validateSync(object: Object): void {
        const validationErrors: ValidationError[] = this.classValidator.validateSync(object);
        if (validationErrors.length > 0) {
            const errorItems = this.mapValidationErrors(validationErrors, [], '/');
            throw new InvalidDtoError(errorItems, 'invalid data');
        }
    }

    private mapValidationErrors(
        validationErrors: ValidationError[], errorItems: ErrorItem[], errorPointerPrefix: string
    ): ErrorItem[] {
        validationErrors.forEach((validationError) => {
            for (const constraintType in validationError.constraints) {
                if (validationError.constraints.hasOwnProperty(constraintType)) {
                    const title = validationError.constraints[constraintType];
                    const pointer = errorPointerPrefix + validationError.property;
                    const source = new Source(pointer, null);
                    errorItems.push(new ErrorItem(title, source));
                }
            }
            if (validationError.children) {
                return this.mapValidationErrors(
                    validationError.children,
                    errorItems,
                    `${errorPointerPrefix}${validationError.property}/`
                );
            }
        });

        return errorItems;
    }
}

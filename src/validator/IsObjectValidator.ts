import {registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function IsObject(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsObject',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return typeof value === 'object';
                },
                defaultMessage: defaultMessage,
            },
        });
    };
}

function defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.targetName}.${validationArguments.property} is not valid`;
}

import 'reflect-metadata';
import {suite} from 'mocha-typescript';
import * as assert from 'assert';
import {Validator} from 'class-validator';
import {ClassTransformer} from 'class-transformer';
import {given} from 'mocha-testdata';
import {CreateTask} from '../../../src/dto/CreateTask';
import * as glob from 'glob';
import {CustomValidator} from '../../../src/service/CustomValidator';
import {ErrorItem} from '../../../src/error/ErrorItem';

interface IInvalidFixture {
    createTask: Object|CreateTask;
    expectedValidationResult: ErrorItem[];
}
suite('CreateTaskSpec', () => {
    const fixtureFolderName = 'create_task';

    const validFixtureFilenames: string[] = glob.sync(__dirname + `/fixtures/${fixtureFolderName}/valid/*.json`);
    const invalidFixtureFilenames: string[] = glob.sync(__dirname + `/fixtures/${fixtureFolderName}/invalid/*.json`);
    const classTransformer = new ClassTransformer();
    const classValidator: CustomValidator = new CustomValidator(new Validator());

    given(validFixtureFilenames).test('Testing valid with ...', testSuccessValidation);
    given(invalidFixtureFilenames).test('Testing invalid with ...', testFailValidation);

    function testSuccessValidation(filename) {
        const fixture = require(filename);
        const model = classTransformer.plainToClass<CreateTask, Object>(CreateTask, fixture);
        return classValidator.validateSync(model);
    }

    function testFailValidation(filename) {
        const fixture: IInvalidFixture = require(filename);
        const model = classTransformer.plainToClass<CreateTask, Object>(CreateTask, fixture.createTask);
        try {
            classValidator.validateSync(model);
        } catch (invalidDtoError) {
            return assert.deepEqual(invalidDtoError.errors, fixture.expectedValidationResult);
        }
        assert.fail('unexpected invalid model passed validation');
    }
});

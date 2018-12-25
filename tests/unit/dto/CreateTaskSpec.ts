import 'reflect-metadata';
import {suite} from 'mocha-typescript';
import * as assert from 'assert';
import {Validator} from 'class-validator';
import {ClassTransformer} from 'class-transformer';
import {given} from 'mocha-testdata';
import {CreateTask} from '../../../src/dto/CreateTask';
import * as glob from 'glob';

suite('CreateTaskSpec', () => {
    const fixtureFolderName = 'create_task';

    const validFixtureFilenames: string[] = glob.sync(__dirname + `/fixtures/${fixtureFolderName}/valid/*.json`);
    const invalidFixtureFilenames: string[] = glob.sync(__dirname + `/fixtures/${fixtureFolderName}/invalid/*.json`);
    const classTransformer = new ClassTransformer();
    const classValidator = new Validator();

    given(validFixtureFilenames).test('Testing valid with ...', testSuccessValidation);
    given(invalidFixtureFilenames).test('Testing invalid with ...', testFailValidation);

    function testSuccessValidation(filename) {
        const fixture = require(filename);
        const model = classTransformer.plainToClass<CreateTask, Object>(CreateTask, fixture);
        return classValidator.validate(model).then(errors => {
            assert.strictEqual(errors.length, 0);
        })
    }

    function testFailValidation(filename) {
        const fixture = require(filename);
        const model = classTransformer.plainToClass<CreateTask, Object>(CreateTask, fixture);
        return classValidator.validate(model).then(errors => {
            assert.ok(!!errors.length);
        });
    }
});

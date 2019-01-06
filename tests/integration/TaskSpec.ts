import {suite, test} from 'mocha-typescript';
import {BaseSpec} from './BaseSpec';
import * as assert from 'assert';
import {AxiosError} from 'axios';
import {CreateTask} from '../../src/dto/CreateTask';

interface IIntegrationFixture {
    createTask: Object|CreateTask;
    response: {
        body: Object;
        statusCode: number;
    }
}

@suite
export class TaskSpec extends BaseSpec {
    static readonly PATH = 'task';
    before(): void {
        super.before();
    }

    after() {
        super.after();
    }

    @test 'should return 403 if sending not valid token'() {
        return this.unAuthenticatedApiClient.post(TaskSpec.PATH)
        .then(() => {
            // @todo replace console with logging class
            console.error('unexpected resolved promise');
            assert.ok(false);
        })
        .catch((error: AxiosError) => {
            assert.equal(error.response.status, 403);
        })
    }

    @test 'should return 400 if invalid with empty create task'() {
        const fixture: IIntegrationFixture = require(
            './fixtures/create_task/invalid/invalid_empty_create_task.json'
        );
        return this.authenticatedApiClient.post(TaskSpec.PATH, fixture.createTask)
        .then(() => {
            // @todo replace console with logging class
            console.error('unexpected resolved promise');
            assert.ok(false);
        })
        .catch((error: AxiosError) => {
            assert.strictEqual(error.response.status, fixture.response.statusCode);
            assert.deepEqual(error.response.data, fixture.response.body);
        })
    }
    // @todo add more tests
}

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
            // @todo log error
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
        return this.assertInvalidPayloads(fixture);
    }

    @test 'should return 400 if invalid method'() {
        const fixture: IIntegrationFixture = require(
            './fixtures/create_task/invalid/invalid_method.json'
        );
        return this.assertInvalidPayloads(fixture);
    }

    @test 'should return 400 if invalid url'() {
        const fixture: IIntegrationFixture = require(
            './fixtures/create_task/invalid/invalid_url.json'
        );
        return this.assertInvalidPayloads(fixture);
    }

    @test 'should return 400 if negative remind me after'() {
        const fixture: IIntegrationFixture = require(
            './fixtures/create_task/invalid/negative_remind_me_after.json'
        );
        return this.assertInvalidPayloads(fixture);
    }

    @test 'should return 400 if string body'() {
        const fixture: IIntegrationFixture = require(
            './fixtures/create_task/invalid/string_body.json'
        );
        return this.assertInvalidPayloads(fixture);
    }

    @test 'should return 400 if string headers'() {
        const fixture: IIntegrationFixture = require(
            './fixtures/create_task/invalid/string_headers.json'
        );
        return this.assertInvalidPayloads(fixture);
    }

    @test 'should return 400 if too big remind me after'() {
        const fixture: IIntegrationFixture = require(
            './fixtures/create_task/invalid/too_big_remind_me_after.json'
        );
        return this.assertInvalidPayloads(fixture);
    }

    private assertInvalidPayloads(fixture: IIntegrationFixture): Promise<void> {
        return this.authenticatedApiClient.post(TaskSpec.PATH, fixture.createTask)
        .then(() => {
            // @todo replace console with logging class
            // @todo log error
            assert.ok(false);
        })
        .catch((error: AxiosError) => {
            assert.strictEqual(error.response.status, fixture.response.statusCode);
            assert.deepEqual(error.response.data, fixture.response.body);
        });
    }
}

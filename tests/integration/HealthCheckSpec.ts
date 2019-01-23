import {suite, test} from 'mocha-typescript';
import {BaseSpec} from './BaseSpec';
import * as assert from 'assert';
import Axios, {AxiosInstance} from 'axios';
import * as Promise from 'bluebird';

@suite
export class HealthCheckSpec extends BaseSpec {
    private httpClient: AxiosInstance;
    before(): Promise<void> {
        return super.before()
        .then(() => {
            this.httpClient = Axios.create({
                baseURL: BaseSpec.BASE_HOST,
            });
        })
    }

    after() {
        super.after();
    }

    @test 'should return 200'() {
        const expectedResponseCode = 200;
        return this.httpClient.get('/health')
        .then((response) => {
            assert.equal(response.status, expectedResponseCode);
        })
    }
}

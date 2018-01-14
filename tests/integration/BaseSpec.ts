import 'source-map-support/register';
import {AxiosInstance} from 'axios';
import Axios from 'axios';

export class BaseSpec {
    static BASE_HOST = 'http://localhost:3000';
    static API_KEY = 'abcd';

    protected authenticatedApiClient: AxiosInstance;
    protected unAuthenticatedApiClient: AxiosInstance;

    before(): void {
        this.authenticatedApiClient = Axios.create({
            baseURL: `${BaseSpec.BASE_HOST}/v1/`,
            headers: {
                'x-api-key': BaseSpec.API_KEY,
            },
        });
        this.unAuthenticatedApiClient = Axios.create({
            baseURL: `${BaseSpec.BASE_HOST}/v1/`,
        });
    }

    after() {
    }
}

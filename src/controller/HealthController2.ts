import {controller, httpGet, interfaces} from 'inversify-express-utils';
import {HealthResponse} from '../dto/HealthResponse';

@controller('/health')
export class HealthController implements interfaces.Controller {
    @httpGet('/')
    public index(): HealthResponse {
        return new HealthResponse(true);
    }
}

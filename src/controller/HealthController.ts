import {controller, httpGet} from 'inversify-express-utils';
import {HealthResponse} from '../dto/HealthResponse';
import {injectable} from 'inversify';

@controller('/health')
@injectable()
export class HealthController {
    @httpGet('/')
    public index(): HealthResponse {
        return new HealthResponse(true);
    }
}

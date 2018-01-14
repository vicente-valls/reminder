import '../dependency-injection/Loader';
import {Container} from 'inversify';
import {HealthController} from '../controller/HealthController';
import {TYPE} from 'inversify-express-utils';
const container = new Container();

container.bind<HealthController>(TYPE.Controller).to(HealthController).whenTargetNamed('HealthController');

export default container;

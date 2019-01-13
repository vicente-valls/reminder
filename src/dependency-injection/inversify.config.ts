import {Container} from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import {ClassTransformer} from 'class-transformer';
import {Validator} from 'class-validator';
import SYMBOLS from './Symbols';
import {ITaskRepository} from '../model/ITaskRepository';
import {SqsTaskRepository} from '../infrastructure/SqsTaskRepository';
const container = new Container();

///////////////////
// services
///////////////////
container.bind<ClassTransformer>(SYMBOLS.ClassTransformer).toConstantValue(new ClassTransformer());
container.bind<Validator>(SYMBOLS.ClassValidator).toConstantValue(new Validator());
// @todo bind decorators with interfaces seem to not work properly
container.bind<ITaskRepository>(SYMBOLS.ITaskRepository).to(SqsTaskRepository);

container.load(buildProviderModule());
export { container };

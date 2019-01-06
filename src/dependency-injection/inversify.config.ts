import {Container} from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import {ClassTransformer} from 'class-transformer';
import {Validator} from 'class-validator';
import SYMBOLS from './Symbols';
const container = new Container();
container.load(buildProviderModule());

///////////////////
// services
///////////////////
container.bind<ClassTransformer>(SYMBOLS.ClassTransformer).toConstantValue(new ClassTransformer());
container.bind<Validator>(SYMBOLS.ClassValidator).toConstantValue(new Validator());

export default container;

// load all injectable entities.

// controller
import '../controller/HealthController';
import '../controller/V1TaskController';

// service
import '../service/TaskService';
import '../service/CustomValidator';
import '../service/ParamConverter';
import '../service/LoggerFactory';

// infrastructure
import '../infrastructure/SqsTaskRepository';
import '../infrastructure/SqsClientFactory';

import 'winston';

import { registerAs } from '@nestjs/config';
import { Configuration } from '../../configuration';
import { SharedConfigNamespace } from '../../constants';
import { RabbitConfig } from './contracts';
import { RabbitModel } from './rabbit-model';
import { getRabbitConfig } from './utils';

export const rabbitConfig = (options?: RabbitConfig) => {
  return registerAs(SharedConfigNamespace.RabbitMq, (): RabbitConfig => {
    const config = new Configuration(options ?? getRabbitConfig());
    return config.validate(RabbitModel);
  });
};

import { RabbitConfig, MongoDatabaseConfig } from '../../shared';
import { CommonNotifyConfig, MailerConfig } from '.';

export type ConfigNotifyOptions = CommonNotifyConfig &
  RabbitConfig &
  MongoDatabaseConfig &
  MailerConfig;

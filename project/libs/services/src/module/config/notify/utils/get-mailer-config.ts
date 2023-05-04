import { MailerConfig } from '../contracts';

export const getMailerConfig = (): MailerConfig => {
  return {
    host: process.env.MAIL_SMTP_HOST,
    port: parseInt(process.env.MAIL_SMTP_PORT, 10),
    user: process.env.MAIL_USER_NAME,
    password: process.env.MAIL_USER_PASSWORD,
    from: process.env.MAIL_FROM,
  };
};

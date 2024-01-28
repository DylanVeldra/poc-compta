import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  accessKeyId: process.env.EMAIL_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.EMAIL_AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3',
  defaultSender:
    process.env.EMAIL_SENDER || 'Bookkeeping <contact+@bookkeeping.com>',
}));

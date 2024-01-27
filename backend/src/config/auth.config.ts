import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  applicationName: process.env.APP_NAME!,
  refreshExpiresIn: '2w',
  accessExpireIn: '10m',
  jwtPublicKey: process.env.JWT_PUBLIC_KEY,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  twoFaWindowStep: 2,
}));

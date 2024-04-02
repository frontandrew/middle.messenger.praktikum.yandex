// export * from './chat';
import { PageError } from './error';
import { PageLogin } from './login';
import { PageReg } from './reg';
import { PageUser } from './user';

export type PagesType = typeof PageError | typeof PageLogin | typeof PageReg | typeof PageUser;

export const Pages = {
  PageError,
  PageLogin,
  PageReg,
  PageUser,
};

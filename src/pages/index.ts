// export * from './chat';
import { PageError } from './error';
import { PageLogin } from './login';
import { PageReg } from './reg';
import { PageUser } from './user';

import type { PageErrorContext } from './error';
import type { PageLoginContext } from './login';
import type { PageRegContext } from './reg';
import type { PageUserContext } from './user';

export type PagesType = typeof PageError
  | typeof PageLogin
  | typeof PageReg
  | typeof PageUser;

export type PagesContext = PageErrorContext
  | PageLoginContext
  | PageRegContext
  | PageUserContext;

export const Pages = {
  PageError,
  PageLogin,
  PageReg,
  PageUser,
};

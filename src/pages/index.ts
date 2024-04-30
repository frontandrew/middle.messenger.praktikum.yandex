// export * from './chat';
import { PageChats } from './chats';
import { PageError } from './error';
import { PageLogin } from './login';
import { PageReg } from './reg';
import { PageUser } from './user';

import type { PageChatsContext } from './chats';
import type { PageErrorContext } from './error';
import type { PageLoginContext } from './login';
import type { PageRegContext } from './reg';
import type { PageUserContext } from './user';

export type PagesType = typeof PageChats
  | typeof PageError
  | typeof PageLogin
  | typeof PageReg
  | typeof PageUser;

export type PagesContext = PageChatsContext
  | PageErrorContext
  | PageLoginContext
  | PageRegContext
  | PageUserContext;

export const Pages = {
  PageChats,
  PageError,
  PageLogin,
  PageReg,
  PageUser,
};

import { LayoutChats } from './components';

import type { LayoutErrorData as PageChatsContext } from './components';

export class PageChats extends LayoutChats {
  constructor(data: PageChatsContext) {
    super(data);
  }
}

export type { PageChatsContext };

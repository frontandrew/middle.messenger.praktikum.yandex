import { LayoutReg } from './components';

import type { FormRegData as PageRegContext } from './components/form-reg/type';

export class PageReg extends LayoutReg {
  constructor(data: PageRegContext) {
    super({ ...data });
  }
}

export type { PageRegContext };

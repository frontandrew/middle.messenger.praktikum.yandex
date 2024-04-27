import { Form } from 'ui';

import type { Children, Props } from 'core';

export interface DialogChildren extends Children {
  content: InstanceType<typeof Form>,
}

export interface DialogProps extends Props {
  isOpen: boolean,
  onClick?: () => void,
}

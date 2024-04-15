import { Form } from 'ui';

import type { Children, Props } from 'core';
import type { FormChildren, FormProps } from 'ui';

export interface DialogArgs extends DialogProps, DialogChildren {}

export interface DialogChildren extends Children {
  content: Form<FormChildren, FormProps>,
}

export interface DialogProps extends Props {
  isOpen: boolean,
  onClick?: () => void,
}

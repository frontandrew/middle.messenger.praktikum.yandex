import type { Children, Props } from 'core';
import type { Text } from 'ui';

import type { FormReg } from '../form-reg';

export interface LayoutRegChildren extends Children {
  title: Text,
  form: FormReg,
}

export interface LayoutRegProps extends Props {}

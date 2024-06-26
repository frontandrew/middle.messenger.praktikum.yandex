import type { Button, Loader, Text } from 'ui';
import type { Children, Props } from 'core';

import type { FormReg } from '../form-reg';

export interface LayoutRegChildren extends Children {
  title: Text;
  form: FormReg;
  redirect: Button;
  loader: Loader;
}

export interface LayoutRegProps extends Props {
  isLoading: boolean;
}

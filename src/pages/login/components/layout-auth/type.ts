import type { Children } from 'core';

import { Text } from 'ui';

import { FormAuth } from '../form-auth';
import type { FormAuthData } from '../form-auth/type';

export interface LayoutAuthArgs {
  data: FormAuthData,
}

export interface LayoutAuthChildren extends Children {
  form: FormAuth,
  title: Text,
}

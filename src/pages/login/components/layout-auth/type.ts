import { Text } from 'ui';

import { FormAuth } from '../form-auth';
import type { FormAuthData } from '../form-auth/type';

export interface LayoutAuthArgs {
  data?: FormAuthData,
  form?: FormAuth,
  title?: Text,
}

export interface LayoutAuthChildren {
  form: FormAuth,
  title: Text,
}

import type { Children } from 'core';

import { Text } from 'ui';

import { FormAuth } from '../form-auth';

export interface LayoutAuthChildren extends Children {
  form: FormAuth,
  title: Text,
}

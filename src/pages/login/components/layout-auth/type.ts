import { Button, Text } from 'ui';

import type { Children } from 'core';

import { FormAuth } from '../form-auth';

export interface LayoutAuthChildren extends Children {
  form: FormAuth,
  title: Text,
  redirect: Button,
}

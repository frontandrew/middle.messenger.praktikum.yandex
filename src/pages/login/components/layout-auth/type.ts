import { Button, Loader, Text } from 'ui';

import type { Children, Props } from 'core';

import { FormAuth } from '../form-auth';

export interface LayoutAuthProps extends Props {
  isLoading: boolean;
}
export interface LayoutAuthChildren extends Children {
  form: FormAuth;
  title: Text;
  redirect: Button;
  loader: Loader;
}

import { Text } from 'ui';

import { FormAuth } from '../form-auth';

export interface LayoutAuthProps {
  [key: string]: string,
}

export interface LayoutAuthChildren {
  form: FormAuth,
  title: Text,
}

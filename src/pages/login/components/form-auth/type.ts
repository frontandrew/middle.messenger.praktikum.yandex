import { Button, Field } from 'ui';

import type { FormData } from 'shared/ui/form/type';

export interface FormAuthData extends FormData {
  login: string,
  password: string,
}

export interface FormAuthArgs {
  [key: string]: unknown,
  data?: FormAuthData,
  login?: Field,
  password?: Field,
  submit?: Button,
  redirect?: Button,
}

export interface FormAuthProps {
  [key: string]: unknown,
  data?: FormAuthData,
}

export interface FormAuthChildren {
  [key: string]: Field | Button,
  login: Field,
  password: Field,
  submit: Button,
  redirect: Button,
}

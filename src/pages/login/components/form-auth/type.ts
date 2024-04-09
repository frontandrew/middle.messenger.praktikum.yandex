import { Button, Field } from 'ui';

import type { FormArgs, FormChildren, FormData, FormProps } from 'ui';

export interface FormAuthData extends FormData {
  login?: string,
  password?: string,
}

export interface FormAuthArgs extends FormArgs {
  data?: FormAuthData,
  login?: Field,
  password?: Field,
  submit?: Button,
  redirect?: Button,
}

export interface FormAuthProps extends FormProps {
  data?: FormAuthData,
}

export interface FormAuthChildren extends FormChildren {
  login: Field,
  password: Field,
  submit: Button,
  redirect: Button,
}

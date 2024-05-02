import { Button, Field } from 'ui';

import type { FormChildren, FormData, FormProps } from 'ui';

export interface FormAuthData extends FormData {
  login?: string,
  password?: string,
}

export interface FormAuthProps extends FormProps {
  data: FormAuthData,
}

export interface FormAuthChildren extends FormChildren {
  login: Field,
  password: Field,
  submit: Button,
}

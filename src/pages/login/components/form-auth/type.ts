import { Button, Field } from 'ui';

import type { FormChildren, FormProps } from 'ui';

export interface FormAuthProps extends FormProps {}

export interface FormAuthChildren extends FormChildren {
  login: Field,
  password: Field,
  submit: Button,
}

import { Button, Field } from 'ui';

import type { FormChildren, FormProps } from 'ui';

export interface FormRegData {
  email: string,
  login: string,
  firstName: string,
  secondName: string,
  phone: string,
  password: string,
  passwordMore: string,
}

export interface FormRegProps extends FormProps {
  data: FormRegData,
}

export interface FormRegChildren extends FormChildren {
  email: Field,
  login: Field,
  firstName: Field,
  secondName: Field,
  phone: Field,
  password: Field,
  passwordMore: Field,
  submit: Button,
}

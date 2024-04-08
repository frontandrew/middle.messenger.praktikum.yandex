import { Button, Field } from 'ui';

import type { FormData } from 'ui';

export interface FormRegData extends FormData {
  email: string,
  login: string,
  firstName: string,
  secondName: string,
  phone: string,
  password: string,
  passwordMore: string,
}

export interface FormRegArgs {
  [key: string]: unknown,
  data?: FormRegData,

  email?: Field,
  login?: Field,
  first_name?: Field,
  second_name?: Field,
  phone?: Field,
  password?: Field,
  password_more?: Field,
  submit?: Button,
  redirect?: Button,
}

export interface FormRegProps {
  [key: string]: unknown,
  data: FormRegData,
}

export interface FormRegChildren {
  [key: string]: Field | Button,
  email: Field,
  login: Field,
  first_name: Field,
  second_name: Field,
  phone: Field,
  password: Field,
  password_more: Field,
  submit: Button,
  redirect: Button,
}

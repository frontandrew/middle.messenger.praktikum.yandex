import { Button, Field } from 'ui';

import type { FormChildren, FormData, FormProps } from 'ui';

export interface FormRegData extends FormData {
  email: string,
  login: string,
  firstName: string,
  secondName: string,
  phone: string,
  password: string,
  passwordMore: string,
}

export interface FormRegArgs extends FormRegProps, MakeOptional<FormRegChildren> {
  data: FormRegData,
}

export interface FormRegProps extends FormProps {
  data: FormRegData,
}

export interface FormRegChildren extends FormChildren {
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

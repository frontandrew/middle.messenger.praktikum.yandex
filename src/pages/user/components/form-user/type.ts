import { Button, Field } from 'ui';
import type { FormChildren } from 'ui';

export interface FormUserArgs {
  isEdit: boolean,
  hasError?: boolean,

  email?: string,
  login?: string,
  firstName?: string,
  secondName?: string,
  nickName?: string,
  phone?: string,
}

export interface FormUserProps {
  isEdit: boolean,
  hasError: boolean,
}

export interface FormUserChildren extends FormChildren {
  email: Field,
  login: Field,
  first_name: Field,
  second_name: Field,
  nick_name: Field,
  phone: Field,
  submit: Button,
}

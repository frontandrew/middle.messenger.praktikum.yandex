import { Button, Field } from 'ui';

export interface FormAuthProps {
  [key: string]: any,
  login?: string,
  password?: string,
}

export interface FormAuthChildren {
  [key: string]: Field | Button | undefined,
  login: Field,
  password: Field,
  submit: Button,
  redirect: Button,
}

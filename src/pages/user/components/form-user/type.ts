import { Button, Field } from 'ui';

import type { FormArgs, FormChildren, FormData, FormProps } from 'ui';

export interface FormUserArgs extends FormArgs {
  isEdit: boolean,
  hasError?: boolean,

  data?: FormUserData,

  email?: Field,
  login?: Field,
  first_name?: Field,
  second_name?: Field,
  nick_name?: Field,
  phone?: Field,
  submit?: Button,
}

export interface FormUserData extends FormData {
  email?: string,
  login?: string,
  firstName?: string,
  secondName?: string,
  nickName?: string,
  phone?: string,
}

export interface FormUserProps extends FormProps {
  data?: FormUserData,

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

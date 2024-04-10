import { Button, Field } from 'ui';

import type { FormArgs, FormChildren, FormData, FormProps } from 'ui';

export interface FormInfoArgs extends FormArgs {
  isEdit: boolean,
  hasError?: boolean,

  data?: FormInfoData,

  email?: Field,
  login?: Field,
  firstName?: Field,
  secondName?: Field,
  nickName?: Field,
  phone?: Field,
  submit?: Button,
}

export interface FormInfoData extends FormData {
  email?: string,
  login?: string,
  firstName?: string,
  secondName?: string,
  nickName?: string,
  phone?: string,
}

export interface FormInfoProps extends FormProps {
  data?: FormInfoData,

  isEdit: boolean,
  hasError: boolean,
}

export interface FormInfoChildren extends FormChildren {
  email: Field,
  login: Field,
  firstName: Field,
  secondName: Field,
  nickName: Field,
  phone: Field,
  submit: Button,
}

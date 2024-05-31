import { Button, Field } from 'ui';

import type { FormChildren, FormProps } from 'ui';

export interface FormInfoData {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  nickName: string;
  phone: string;
}

export interface FormInfoProps extends FormProps {
  isEdit?: boolean;
}

export interface FormInfoChildren extends FormChildren {
  email: Field;
  login: Field;
  firstName: Field;
  secondName: Field;
  nickName: Field;
  phone: Field;
  submit: Button;
}

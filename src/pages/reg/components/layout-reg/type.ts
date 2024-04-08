import { Text } from 'ui';

import { FormReg } from '../form-reg';
import type { FormRegData } from '../form-reg/type';

export interface LayoutRegArgs {
  isEdit?: boolean,
  data?: FormRegData,

  title?: Text,
  form?: FormReg,
}

export interface LayoutRegChildren {
  title: Text,
  form: FormReg,
}

export interface LayoutRegProps {
  isEdit: boolean,
  data: FormRegData,
}

import { Text } from 'ui';

import type { Children, Props } from 'core';

import { FormReg } from '../form-reg';
import type { FormRegData } from '../form-reg/type';

export interface LayoutRegArgs extends LayoutRegProps, LayoutRegChildren {}

export interface LayoutRegChildren extends Children {
  title: Text,
  form: FormReg,
}

export interface LayoutRegProps extends Props {
  isEdit: boolean,
  data: FormRegData,
}

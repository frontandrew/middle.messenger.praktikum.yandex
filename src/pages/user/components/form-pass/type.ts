import { Button, Field } from 'ui';

import type { FormChildren, FormProps } from 'ui';

export interface FormPassData {
  passCurr: string;
  passNew: string;
  passNewMore: string;
}

export interface FormPassProps extends FormProps {}

export interface FormPassChildren extends FormChildren {
  passCurr: Field;
  passNew: Field;
  passNewMore: Field;
  submit: Button;
}

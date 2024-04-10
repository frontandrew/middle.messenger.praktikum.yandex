import { Button, Field } from 'ui';

import type { FormArgs, FormChildren, FormProps } from 'ui';

export interface FormPassArgs extends FormArgs {
  passCurr?: Field,
  passNew?: Field,
  passNewMore?: Field,
  submit?: Button,
}

export interface FormPassProps extends FormProps {
  isEdit: boolean,
}

export interface FormPassChildren extends FormChildren {
  passCurr: Field,
  passNew: Field,
  passNewMore: Field,
  submit: Button,
}

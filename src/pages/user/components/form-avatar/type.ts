import { Button } from 'ui';

import type { FormArgs, FormChildren, FormProps } from 'ui';

export interface FormAvatarArgs extends FormArgs {
  submit?: Button,
}

export interface FormAvatarProps extends FormProps {
  isEdit: boolean,
}

export interface FormAvatarChildren extends FormChildren {
  submit: Button,
}

import { Button } from 'ui';

import type { FormChildren, FormProps } from 'ui';

export interface FormAvatarArgs extends FormAvatarChildren, FormAvatarProps {}

export interface FormAvatarProps extends FormProps {
  isEdit: boolean,
}

export interface FormAvatarChildren extends FormChildren {
  submit: Button,
}

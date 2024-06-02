import type { ButtonIcon, Field, FormChildren, FormProps } from 'ui';

export interface FormMessageProps extends FormProps {}
export interface FormMessageChildren extends FormChildren {
  message: Field,
  submit: ButtonIcon,
}

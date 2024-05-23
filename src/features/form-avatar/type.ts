import type { Button, Field, FormChildren, FormProps, Text } from 'ui';

export interface FormAvatarProps extends FormProps {}

export interface FormAvatarChildren extends FormChildren {
  title: Text;
  avatar: Field;
  submit: Button;
  error: Text;
}
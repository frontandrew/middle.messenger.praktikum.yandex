import type { Button, Field, FormChildren, FormProps, Text } from 'ui';

export interface FormAvatarArgs extends FormAvatarChildren, FormAvatarProps {}

export interface FormAvatarProps extends FormProps {}

export interface FormAvatarChildren extends FormChildren {
  title: Text,
  file: Field,
  submit: Button,
  error: Text,
}

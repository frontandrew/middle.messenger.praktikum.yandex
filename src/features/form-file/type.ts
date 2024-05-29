import type { Button, Field, FormChildren, FormProps, Text } from 'ui';

export interface FormFileProps extends FormProps {}

export interface FormFileChildren extends FormChildren {
  title: Text;
  file: Field;
  submit: Button;
  error: Text;
}

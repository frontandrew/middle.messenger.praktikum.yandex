import { Button, Field } from 'ui';

import type { FormChildren, FormProps, Text } from 'ui';

export interface FormChatProps extends FormProps {}

export interface FormChatChildren extends FormChildren {
  title: Text;
  chatTitle: Field;
  submit: Button;
  error: Text;
}

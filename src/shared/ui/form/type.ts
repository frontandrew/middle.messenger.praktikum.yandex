import { Button, Field } from 'ui';

export interface FormArgs {
  hasError?: boolean,
}

export interface FormProps {
  hasError: boolean,

  validate: () => void,
  resetForm: () => void,
  submitForm: () => void,
}

export interface FormChildren {
  [key: string]: Field | Button,
  submit: Button,
  reset: Button,
}

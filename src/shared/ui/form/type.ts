import { Button, Field } from 'ui';

export interface FormArgs {
  hasError?: boolean,
}

export interface FormProps {
  hasError: boolean,
}

export interface FormChildren {
  [key: string]: Field | Button | undefined,
  submit: Button,
  reset?: Button,
}

import { Button, Field } from 'ui';

export interface FormProps {
  [key: string]: any,
  disabled?: boolean,
  hasError?: boolean,

  onSubmit?: ({}: Event) => Event,
  onReset?: () => void,
  onInput?: () => void,
}

export interface FormChildren {
  [key: string]: Field | Button | undefined,
  submit: Button,
  reset?: Button,
}

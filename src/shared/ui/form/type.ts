import { Button, Field } from 'ui';

export interface FormData {
  [key: string]: string | undefined,
}

export interface FormArgs {
  // [key: string]: unknown,
  data?: FormData,

  disabled?: boolean,
  hasError?: boolean,

  onSubmit?: ({}: Event) => Event,
  onReset?: () => void,
  onInput?: () => void,

  submit?: Button,
}

export interface FormProps {
  data?: FormData,
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

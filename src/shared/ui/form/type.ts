import { Button, Field } from 'ui';

export type FormArgument = FormData | Field | Button | FormEvent | boolean | undefined;
export type FormEvent = ({}: Event) => Event

export interface FormData {
  [key: string]: string | undefined,
}

export interface FormArgs {
  [key: string]: FormArgument,
  data?: FormData,

  disabled?: boolean,
  hasError?: boolean,

  onSubmit?: ({}: Event) => Event,
  onReset?: ({}: Event) => Event,
  onInput?: ({}: Event) => Event,

  submit?: Button,
}

export interface FormProps {
  data?: FormData,
  disabled?: boolean,
  hasError?: boolean,

  onSubmit?: ({}: Event) => Event,
  onReset?: ({}: Event) => Event,
  onInput?: ({}: Event) => Event,
}

export interface FormChildren {
  [key: string]: Field | Button | undefined,
  submit: Button,
  reset?: Button,
}

import { Button, Field } from 'ui';

import { Children, Props } from 'core';

export interface FormData {
  [key: string]: string,
}

export interface FormArgs extends FormProps, MakeOptional<FormChildren> {}

export interface FormProps extends Props {
  data?: FormData,
  disabled?: boolean,
  hasError?: boolean,

  onSubmit?: ({}: Event) => Event,
  onReset?: ({}: Event) => Event,
  onInput?: ({}: Event) => Event,
}

export interface FormChildren extends MakeOptional<Children> {
  [key: string]: Field | Button | undefined
  submit: Button,
  reset?: Button,
}

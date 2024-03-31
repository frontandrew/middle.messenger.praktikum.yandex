import type { ValidationState, ValidatorParams } from 'tools';

import type { InputTypes } from '../input/type';

export interface FieldArgs {
  name: string,
  label: string,
  type: InputTypes,

  class?: string,
  disabled?: boolean,
  hasError?: boolean,
  textError?: string,
  textHelp?: string,
  required?: boolean,
  value?: string,
  validator?: ({}: ValidatorParams) => ValidationState,

  onChange?: ({}: InputEvent) => Event
  onInput?: ({}: InputEvent) => Event
}

export interface FieldProps {
  readonly name: string,
  readonly label: string,

  class: string,
  hasError: boolean,
  textError: string,
  textHelp: string,

  onChange: ({}: InputEvent) => Event
  onInput: ({}: InputEvent) => Event
}

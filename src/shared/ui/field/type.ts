import type { ValidationState, ValidatorParams } from 'tools';

export interface FieldArgs {
  name: string,
  label: string,
  type: 'text' | 'password' | 'phone' | 'email',

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

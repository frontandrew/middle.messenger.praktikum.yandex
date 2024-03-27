import type { ValidationState, ValidatorParams } from 'tools';

export interface FieldArgs {
  name: string,
  label: string,
  type: 'text' | 'password',

  value?: string,
  touched?: boolean,
  hasError?: boolean,
  textError?: string,
  textHelp?: string,
  required?: boolean,
  disabled?: boolean,
  validator?: ({}: ValidatorParams) => ValidationState,

  onChange?: ({}: InputEvent) => Event
  onInput?: ({}: InputEvent) => Event
}

export interface FieldProps {
  readonly name: string,
  readonly label: string,
  type: 'text' | 'password',

  value: string,
  touched: boolean,
  hasError: boolean,
  textError: string,
  textHelp: string,
  required: boolean,
  disabled: boolean,
  validator: ({}: ValidatorParams) => ValidationState,

  onChange: ({}: InputEvent) => Event
  onInput: ({}: InputEvent) => Event
}

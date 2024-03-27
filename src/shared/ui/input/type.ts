import type { ValidationState, ValidatorParams } from 'tools';

export interface InputArgs {
  name: string,
  type: 'text' | 'password',

  class?: string,
  disabled?: boolean,
  hasError?: boolean,
  required?: boolean,
  touched?: boolean,
  value?: string,
  validator?: ({}: ValidatorParams) => ValidationState,

  onBlur?: ({}: InputEvent) => Event
  onChange?: ({}: InputEvent) => Event
  onInput?: ({}: InputEvent) => Event
}

export interface InputProps {
  readonly name: string,
  type: 'text' | 'password',

  class: string,
  disabled: boolean,
  hasError: boolean,
  required: boolean,
  touched: boolean,
  value: string,
  validator: ({}: ValidatorParams) => ValidationState,

  onBlur: ({}: InputEvent) => Event
  onChange: ({}: InputEvent) => Event
  onInput: ({}: InputEvent) => Event
}

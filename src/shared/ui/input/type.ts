import type { ValidationState, ValidatorParams } from 'tools';

export type InputTypes = 'text'
| 'password'
| 'email'
| 'tel'
| 'file'
| 'image';

export interface InputArgs {
  name: string,
  type: InputTypes,

  class?: string,
  disabled?: boolean,
  hasError?: boolean,
  inline?: boolean,
  required?: boolean,
  touched?: boolean,
  value?: string,
  validator?: ({}: ValidatorParams) => ValidationState,

  onBlur?: () => void
  onInput?: ({}: InputEvent) => Event
}

export interface InputProps {
  readonly name: string,
  type: InputTypes,

  class: string,
  disabled: boolean,
  hasError: boolean,
  inline: boolean,
  required: boolean,
  touched: boolean,
  value: string,
  validator: ({}: ValidatorParams) => ValidationState,

  onBlur: () => void,
  onInput: ({}: InputEvent) => Event
}

export type InputState = {
  value?: string,
  disabled?: boolean,
  hasError?: boolean
}

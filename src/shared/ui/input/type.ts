import type { Children, Props } from 'core';

export type InputTypes = 'text'
| 'password'
| 'email'
| 'tel'
| 'file';

export interface InputProps extends Props {
  readonly name: string,
  readonly type?: InputTypes,

  placeholder?: string,
  classes?: string,
  disabled?: boolean,
  hasError?: boolean,
  value: string,

  onBlur?: () => void,
  onInput?: ({}: InputEvent) => InputEvent,
}

export interface InputChildren extends Children {}

import type { ValidationState, ValidatorParams } from 'tools';

import { Input } from '../input';
import type { InputTypes } from '../input/type';

export type FieldState = {
  value: string,
  textError: string,
  hasError: boolean,
}

export interface FieldArgs {
  readonly name: string,
  readonly label: string,
  readonly type: InputTypes,

  class?: string,
  disabled?: boolean,
  inline?: boolean,
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
  readonly type: InputTypes,

  class?: string,
  disabled?: boolean,
  inline?: boolean,
  hasError?: boolean,
  textError?: string,
  textHelp?: string,
  required?: boolean,
  value?: string,
  validator?: ({}: ValidatorParams) => ValidationState,

  onChange?: ({}: InputEvent) => Event
  onInput?: ({}: InputEvent) => Event
}

export interface FieldChildren {
  input: Input
}

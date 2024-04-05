import type { ValidationState, ValidatorParams } from 'tools';

import { Input } from '../input';
import type { InputTypes } from '../input/type';

export interface FieldArgs {
  readonly name: string,
  readonly label: string,
  readonly type: InputTypes,

  classes?: string,
  disabled?: boolean,
  inline?: boolean,
  hasError?: boolean,
  textError?: string,
  textHelp?: string,
  required?: boolean,
  value?: string,
  validator?: ({}: ValidatorParams) => ValidationState,
}

export interface FieldProps {
  readonly name: string,
  readonly label: string,
  readonly type: InputTypes,

  classes?: string,
  disabled?: boolean,
  inline?: boolean,
  hasError?: boolean,
  textError?: string,
  textHelp?: string,
  required?: boolean,
  value?: string,
  validator?: ({}: ValidatorParams) => ValidationState,
}

export interface FieldChildren {
  input: Input
}

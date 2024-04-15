import type { Children, Props } from 'core';
import type { ValidationState, ValidatorParams } from 'tools';

import { Input } from '../input';
import type { InputTypes } from '../input/type';

export interface FieldArgs extends FieldProps, MakeOptional<FieldChildren> {}

export interface FieldProps extends Props {
  name: string,
  label: string,
  type: InputTypes,

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

export interface FieldChildren extends Children {
  input: Input
}

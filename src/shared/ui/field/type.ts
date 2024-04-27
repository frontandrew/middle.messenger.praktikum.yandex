import { Input, InputField, InputFile } from 'ui';

import type { Children, Props } from 'core';
import type { InputChildren, InputFieldProps, InputType } from 'ui';
import type { ValidationState, ValidatorParams } from 'tools';

export interface FieldProps extends Props {
  name: string,
  type: InputType | 'simple',

  label?: string,
  placeholder?: string,
  classes?: string,
  disabled?: boolean,
  inline?: boolean,
  hasError?: boolean,
  textHelp?: string,
  required?: boolean,
  value?: string,
  validator?: ({}: ValidatorParams) => ValidationState,
}

export interface FieldChildren extends Children {
  input: Input<InputChildren, InputFieldProps> | InputField | InputFile
}

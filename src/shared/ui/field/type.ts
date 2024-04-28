import type { Input, InputProps } from 'ui';
import type { ValidationState, ValidatorParams } from 'tools';
import type { Children } from 'core';

export interface FieldProps extends InputProps {
  validator?: ({}: ValidatorParams) => ValidationState,
  required?: boolean;
}

export interface FieldChildren extends Children {
  input: Input;
}

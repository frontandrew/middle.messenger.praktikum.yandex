import type { Input, InputProps } from 'ui';
import type { Children } from 'core';

export interface FieldProps extends InputProps {
  required?: boolean;
  hasError?: boolean;
  textError?: string;
  textHelp?: string;
  label?: string;
  inline?: boolean;
}

export interface FieldChildren extends Children {
  input: Input;
}

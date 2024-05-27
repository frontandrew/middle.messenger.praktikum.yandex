import type { Input, InputProps } from 'ui';
import type { Children } from 'core';

export interface FieldProps extends InputProps {
  tabindex: number;

  autofocus?: boolean;
  required?: boolean;
  hasError?: boolean;
  textError?: string;
  textHelp?: string;
  label?: string;
  inline?: boolean;
  disabled?: boolean;
  value?: string;
  file?: File;
}

export interface FieldChildren extends Children {
  input: Input;
}

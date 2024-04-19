import { Input } from '../input';

import type { InputChildren, InputProps } from '../input';

export interface InputFieldChildren extends InputChildren {
  input: Input<InputChildren, InputProps>,
}
export interface InputFieldProps extends InputProps {
  label: string,

  hasError?: boolean,
  inline?: boolean,
}

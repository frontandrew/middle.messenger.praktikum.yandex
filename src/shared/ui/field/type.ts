import type { Props } from 'core';
import type { ValidationState } from 'tools';

export interface FieldProps extends Props {
  readonly name: string,
  readonly label: string,
  type: 'text' | 'password',

  value?: string | undefined,
  touched?: boolean,
  hasError?: boolean,
  textError?: string | undefined,
  textHelp?: string | undefined,
  required?: boolean,
  disabled?: boolean,
  validator?: () => ValidationState,

  onChange?: ({}: Event) => Event
  onInput?: ({}: Event) => Event
}

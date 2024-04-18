import type { Children, Props } from 'core';

export type InputType = 'text' | 'password' | 'file';

// type InputAccept = 'image/*' | 'video/*';

export interface InputProps extends Props {
  readonly name: string,
  // label: string,

  // inline?: boolean,
  // accept?: InputAccept,
  type?: InputType,
  value?: string,
  placeholder?: string,
  classes?: string,
  disabled?: boolean,
  // hasError?: boolean,

  onBlur?: () => void,
  onInput?: ({}: InputEvent) => InputEvent,
}

export interface InputChildren extends Children {}

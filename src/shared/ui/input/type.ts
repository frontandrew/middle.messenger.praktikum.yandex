import type { Children, Props } from 'core';

type InputAccept = 'image/*' | 'video/*';
export type InputType = 'text' | 'password' | 'file' | 'simple';

export interface InputProps extends Props {
  name: string;
  type: InputType;
  tabindex: number;

  autofocus?: boolean;
  accept?: InputAccept;
  classes?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;

  onChange?: () => void;
  onBlur?: () => void;
  onInput?: ({}: InputEvent) => InputEvent;
}

export interface InputChildren extends Children {}

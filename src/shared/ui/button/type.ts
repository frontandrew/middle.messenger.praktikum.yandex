import type { Children, Props } from 'core';

export type ButtonTypes = 'submit' | 'reset' | 'button';
type ButtonVariants = 'filled' | 'link' | 'text';

export interface ButtonChildren extends Children {}

export interface ButtonProps extends Props {
  readonly label: string;
  tabindex: number;

  autofocus?: boolean;
  classes?: string;
  disabled?: boolean;
  type?: ButtonTypes;
  variant?: ButtonVariants;

  onClick?: (({}: Event) => Event) | (() => void);
}

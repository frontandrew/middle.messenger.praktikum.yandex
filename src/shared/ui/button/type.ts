type ButtonTypes = 'submit' | 'reset' | 'button';
type ButtonVariants = 'filled' | 'link' | 'text';

export interface ButtonArgs {
  readonly label: string,

  classes?: string,
  disabled?: boolean,
  page?: string,
  type?: ButtonTypes,
  variant?: ButtonVariants,

  onClick?: ({}: Event) => Event
}

export interface ButtonProps {
  readonly label: string,

  classes?: string,
  disabled: boolean,
  page?: string,
  type?: ButtonTypes,
  variant?: ButtonVariants,

  onClick?: ({}: Event) => Event
}

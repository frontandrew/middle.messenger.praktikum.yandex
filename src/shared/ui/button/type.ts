export interface ButtonArgs {
  label: string,

  classes?: string,
  disabled?: boolean,
  page?: string,
  type?: 'submit' | 'reset' | 'button',
  variant?: 'filled' | 'link' | 'text',

  onClick?: () => void,
  // onClick?: ({}: Event) => Event
}

export interface ButtonProps {
  readonly label: string,
  disabled: boolean,
  type: 'submit' | 'reset' | 'button',
  variant: 'filled' | 'link' | 'text',

  classes?: string,
  page?: string,

  // onClick?: ({}: Event) => Event
}

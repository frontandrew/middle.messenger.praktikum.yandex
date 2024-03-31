export interface ButtonArgs {
  label: string,

  class?: string,
  disabled?: boolean,
  page?: string,
  type?: 'submit' | 'reset' | 'button',
  variant?: 'filled' | 'link' | 'text',

  onClick?: ({}: Event) => Event
}

export interface ButtonProps {
  readonly label: string,
  disabled: boolean,
  type: 'submit' | 'reset' | 'button',
  variant: 'filled' | 'link' | 'text',

  class?: string,
  page?: string,

  onClick?: ({}: Event) => Event
}

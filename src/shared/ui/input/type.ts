export type InputTypes = 'text'
| 'password'
| 'email'
| 'tel'
| 'file'
| 'image';

export interface InputArgs {
  name: string,

  type?: InputTypes,
  classes?: string,
  disabled?: boolean,
  hasError?: boolean,
  value?: string,

  onBlur?: () => void
  onInput?: ({}: InputEvent) => Event
}

export interface InputProps {
  readonly name: string,
  readonly type: InputTypes,

  classes?: string,
  disabled?: boolean,
  hasError?: boolean,
  value?: string,

  onBlur?: () => void,
  onInput?: ({}: InputEvent) => Event
}

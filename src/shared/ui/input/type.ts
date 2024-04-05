export type InputTypes = 'text'
| 'password'
| 'email'
| 'tel'
| 'file'
| 'image';

export interface InputArgs {
  readonly name: string,
  readonly type?: InputTypes,

  classes?: string,
  disabled?: boolean,
  hasError?: boolean,
  value?: string,

  onBlur?: () => void,
  onInput?: ({}: InputEvent) => InputEvent,
}

export interface InputProps {
  readonly name: string,
  readonly type?: InputTypes,

  classes?: string,
  disabled?: boolean,
  hasError?: boolean,
  value?: string,

  onBlur?: () => void,
  onInput?: ({}: InputEvent) => InputEvent,
}

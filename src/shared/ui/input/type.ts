import type { Children, Props } from 'core';

type InputAccept = 'image/*' | 'video/*';
export type InputType = 'text' | 'password' | 'file' | 'simple';

// export interface InputFileProps extends Props {
//   readonly name: string;
//   readonly label: string;
//   readonly type: InputType;
//   readonly accept: InputAccept;

//   classes?: string;
//   disabled?: boolean;

//   onBlur?: () => void;
// }

// export interface InputFieldProps extends Props {
//   readonly name: string;
//   readonly label: string;
//   readonly type: InputType;

//   classes?: string;
//   disabled?: boolean;
//   inline?: string;
//   textHelp?: string;
//   validators?: string[];
//   value?: string;

//   onBlur?: () => void;
// }

// export interface InputSimpleProps extends Props {
//   readonly name: string;
//   readonly type: InputType;

//   classes?: string;
//   disabled?: boolean;
//   value?: string;

//   onBlur?: () => void;
// }

export interface InputProps extends Props {
  name: string;
  type: InputType;

  label?: string;
  accept?: InputAccept;
  classes?: string;
  disabled?: boolean;
  inline?: string;
  textHelp?: string;
  validators?: string[];
  value?: string;

  onBlur?: () => void;

  onInput?: ({}: InputEvent) => InputEvent;
}

export interface InputChildren extends Children {}

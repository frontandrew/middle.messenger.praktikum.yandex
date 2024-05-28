import { Button, ButtonIcon } from 'ui';

import { Children, Props } from 'core';

// export interface FormData {
//   [key: string]: unknown;
// }

export interface FormProps extends Props {
  disabled?: boolean;
  hasError?: boolean;

  onSubmit?: ({}: SubmitEvent) => SubmitEvent;
  onReset?: ({}: Event) => Event;
  onInput?: ({}: InputEvent) => InputEvent;
}

export interface FormChildren extends Children {
  submit: Button | ButtonIcon;
  reset: Button | ButtonIcon;
}

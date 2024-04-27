import { Button, ButtonIcon } from 'ui';

import { Children, Props } from 'core';

export interface FormData {
  [key: string]: unknown,
}

export interface FormProps extends Props {
  data?: FormData,
  disabled?: boolean,
  hasError?: boolean,

  onSubmit?: ({}: Event) => Event,
  onReset?: ({}: Event) => Event,
  onInput?: ({}: Event) => Event,
}

export interface FormChildren extends Children {
  submit: Button | ButtonIcon,
  reset: Button | ButtonIcon,
}

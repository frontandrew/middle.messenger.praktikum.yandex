import { Form } from 'ui';

export interface DialogArgs extends DialogProps, DialogChildren {}

export interface DialogChildren {
  content?: typeof Form,
}

export interface DialogProps {
  isOpen: boolean,
  onClick?: () => void,
}

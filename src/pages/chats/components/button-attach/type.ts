import { Children, Props } from 'shared/core/component';

export interface ButtonAttachProps extends Props {
  pic?: string,
  onClick: () => void,
}

export interface ButtonAttachChildren extends Children {}

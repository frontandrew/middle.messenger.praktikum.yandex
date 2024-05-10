import type { Children, Props } from 'core';

export interface LoaderChildren extends Children {}

export interface LoaderProps extends Props {
  classes: string,
  disabled: boolean,
}

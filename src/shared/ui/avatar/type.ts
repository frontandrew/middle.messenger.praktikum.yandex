import { Children, Props } from 'core';

type SizeType = 'large' | 'medium' | 'small';

export interface AvatarArgs extends AvatarProps {}

export interface AvatarProps extends Props {
  pic?: string,

  classes?: string,
  size?: SizeType,
  stub?: string,
}

export interface AvatarChildren extends Children {}

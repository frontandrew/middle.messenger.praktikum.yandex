import type { Children, Props } from 'core';

import { Avatar } from 'ui';

export interface ControlAvatarChildren extends Children {
  avatar: Avatar,
}

export interface ControlAvatarProps extends Props {
  onClick?: () => void,
  disabled?: boolean,
  image?: string,
}

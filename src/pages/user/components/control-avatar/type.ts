import { Avatar } from 'ui';

export interface ControlAvatarArgs extends ControlAvatarProps, ControlAvatarChildren {
  image?: string,
}

export interface ControlAvatarChildren {
  avatar?: Avatar,
}

export interface ControlAvatarProps {
  onClick?: () => void,
  disabled?: boolean,
}

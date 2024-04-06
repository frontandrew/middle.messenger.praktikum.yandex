type SizeType = 'large' | 'medium' | 'small';

export interface AvatarArgs {
  pic?: string,

  classes?: string,
  size?: SizeType,
  stub?: string,
}

export interface AvatarProps {
  pic?: string,

  classes?: string,
  size?: SizeType,
  stub?: string,
}

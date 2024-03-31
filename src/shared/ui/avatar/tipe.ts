type SizeType = 'large' | 'medium' | 'small';

export interface AvatarArgs {
  class?: string,
  pic?: string,
  size?: SizeType,
}

export interface AvatarProps {
  class?: string,
  pic?: string,
  size: SizeType,
}

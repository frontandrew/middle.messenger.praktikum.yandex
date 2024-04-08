type SizeType = 'large' | 'medium' | 'small';
export interface AvatarProps {
  pic?: string,

  classes?: string,
  size?: SizeType,
  stub?: string,
}

type SizeType = 'large' | 'medium' | 'small';

export interface AvatarArgs {
  classes?: string,
  pic?: string,
  size?: SizeType,
  def?: string,
}

export interface AvatarProps {
  classes?: string,
  pic: string,
  size: SizeType,
  def: string,
}

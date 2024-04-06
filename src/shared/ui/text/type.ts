type Tag = 'p' | 'span' | 'h1' | 'h2' | 'h3'

export interface TextProps {
  classes?: string,
  tag: Tag,
  text: string,
}

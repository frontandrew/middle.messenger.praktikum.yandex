import type { Props } from 'core';

type Tag = 'p' | 'span' | 'h1' | 'h2' | 'h3'

export interface TextProps extends Props {
  classes?: string,
  tag?: Tag,
  text: string,
}

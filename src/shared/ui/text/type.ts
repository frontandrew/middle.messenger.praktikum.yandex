import type { Props } from 'core';

type Tag = 'p' | 'span' | 'h1' | 'h2' | 'h3'

export interface TextArgs {
  text: string,
  tag?: Tag,
  class?: string,
}

export interface TextProps extends Props {
  text: string,
  tag: Tag,
  class?: string,
}

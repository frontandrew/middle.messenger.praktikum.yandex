import type { Props } from 'core';

type TagProp = 'p' | 'span' | 'h1' | 'h2' | 'h3'

export interface TextProps extends Props {
  text: string,
  tag?: TagProp,
  class?: string,
}

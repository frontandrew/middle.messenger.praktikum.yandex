import { Button, Text } from 'ui';

import type { Children, Props } from 'core';

export interface LayoutErrorProps extends Props {
  title: string,
  message: string,
}

export interface LayoutErrorChildren extends Children {
  title: Text,
  message: Text,
  redirect: Button,
}

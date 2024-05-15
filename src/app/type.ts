import { Loader } from 'ui';

import type { Children, Props } from 'core';

export interface AppProps extends Props {
  isLoading: boolean;
}
export interface AppChildren extends Children {
  loader: Loader;
}

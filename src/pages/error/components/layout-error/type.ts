import { Button, Text } from 'ui';

import type { Children, Props } from 'core';

export interface LayoutErrorData {
    title: string,
    message: string,
    target: string,
  }

export interface LayoutErrorArgs extends LayoutErrorProps, MakeOptional<LayoutErrorChildren> {
    data: LayoutErrorData,
  }

export interface LayoutErrorChildren extends Children {
  title: Text,
  message: Text,
  redirect: Button,
}

export interface LayoutErrorProps extends Props {}

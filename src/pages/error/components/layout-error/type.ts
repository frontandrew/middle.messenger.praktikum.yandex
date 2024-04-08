import { Button, Text } from 'ui';

export interface LayoutErrorData {
    title: string,
    message: string,
    target: string,
  }

export interface LayoutErrorArgs {
  data?: LayoutErrorData,

  title?: Text,
  message?: Text,
  redirect?: Button,
}

export interface LayoutErrorChildren {
  title: Text,
  message: Text,
  redirect: Button,
}

export interface LayoutErrorProps {
  data: LayoutErrorData,
}

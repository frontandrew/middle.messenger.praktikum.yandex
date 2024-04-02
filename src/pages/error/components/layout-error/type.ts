import { Button, Text } from 'ui';

export interface LayoutErrorArgs {
  title: string,
  message: string,
  redirectLabel: string,
  redirectTarget: string,
}

export interface LayoutErrorChildren {
  title: Text,
  message: Text,
  redirect: Button,
}

export interface LayoutErrorProps {

}

import { Button, Dialog, Text } from 'ui';

import type { Children, Props } from 'core';

import { ControlAvatar } from '../control-avatar';
import { FormInfo } from '../form-info';
import { FormPass } from '../form-pass';

import type { FormInfoData } from '../form-info/type';

export interface LayoutUserArgs {
  data: FormInfoData,
  image: string,
}

export interface LayoutUserChildren extends Children {
  back: Button,
  avatar: ControlAvatar,
  nick: Text,
  formInfo: FormInfo,
  formPass: FormPass,
  changeInfo: Button,
  changePass: Button,
  signOut: Button,
  avatarDialog: Dialog,
}

export interface LayoutUserProps extends Props {
  showActions: boolean,
  showInfo: boolean,
}

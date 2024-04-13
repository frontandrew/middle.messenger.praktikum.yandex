import { Button, Dialog, Text } from 'ui';

import { ControlAvatar } from '../control-avatar';
import { FormInfo } from '../form-info';
import { FormPass } from '../form-pass';

import type { FormInfoData } from '../form-info/type';

export interface LayoutUserArgs extends LayoutUserChildren, LayoutUserProps {
  data?: FormInfoData,
  image?: string,
}

export interface LayoutUserChildren {
  back?: Button,
  avatar?: ControlAvatar,
  nick?: Text,
  formInfo?: FormInfo,
  formPass?: FormPass,
  changeInfo?: Button,
  changePass?: Button,
  signOut?: Button,
  avatarDialog?: Dialog,
}

export interface LayoutUserProps {
      showActions: boolean,
      showInfo: boolean,
}

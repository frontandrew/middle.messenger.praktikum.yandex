import { Button, Text } from 'ui';

import { ControlAvatar } from '../control-avatar';
import { FormInfo } from '../form-info';
import { FormPass } from '../form-pass';

import type { FormInfoData } from '../form-info/type';

interface LayoutUserMode {
      pass: boolean,
      image: boolean,
      view: boolean,
      info: boolean,
  }

export type LayoutUserMods = 'view' | 'info' | 'pass' | 'image';

export interface LayoutUserArgs extends LayoutUserChildren {
  mode?: LayoutUserMode
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
}

export interface LayoutUserProps {
  mode: LayoutUserMode,
}

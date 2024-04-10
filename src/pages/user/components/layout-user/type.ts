import { Avatar, Button, Text } from 'ui';
import { FormInfo } from '../form-info';

import type { FormInfoData } from '../form-info/type';

interface LayoutUserMode {
      pass: boolean,
      image: boolean,
      view: boolean,
      info: boolean,
  }

export interface LayoutUserArgs extends LayoutUserChildren {
  mode?: LayoutUserMode
  data?: FormInfoData,
  image?: string,
}

export interface LayoutUserChildren {
  back?: Button,
  avatar?: Avatar,
  nick?: Text,
  formInfo?: FormInfo,
  changeInfo?: Button,
  changePass?: Button,
  signOut?: Button,
}

export interface LayoutUserProps {
  mode: LayoutUserMode,
}

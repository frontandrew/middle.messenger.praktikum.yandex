import { Avatar, Button, Text } from 'ui';
import { FormUser } from '../form-user';

import type { FormUserData } from '../form-user/type';

export interface LayoutUserArgs {
  isEdit: boolean,

  data?: FormUserData,
  image?: string,

  back?: Button,
  avatar?: Avatar,
  nick?: Text,
  form?: FormUser,
  change_info?: Button,
  change_pass?: Button,
  sign_out?: Button,
}

export interface LayoutUserChildren {
  back: Button,
  avatar: Avatar,
  nick: Text,
  form: FormUser,
  change_info: Button,
  change_pass: Button,
  sign_out: Button,
}

export interface LayoutUserProps {
  isEdit: boolean,
}

import { Avatar, Button, Text } from 'ui';
import { FormUser } from '../form-user';

export interface LayoutUserArgs {
  isEdit: boolean,

  image?: string,
  nickName?: string,
  email?: string,
  login?: string,
  firstName?: string,
  secondName?: string,
  phone?: string,
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

}

import { Avatar, Button, Text } from 'ui';
import { Component } from 'core';

import { FormUser } from '../form-user';

import type { LayoutUserArgs, LayoutUserChildren, LayoutUserProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class LayoutUser extends Component<LayoutUserArgs, LayoutUserChildren, LayoutUserProps> {
  constructor(args: LayoutUserArgs) {
    const {
      image, nickName, email, login, firstName, secondName, phone, isEdit,
    } = args;

    super({
      back: new Button({
        label: '<',
        page: 'login', // TODO: > chats
      }),
      avatar: new Avatar({
        pic: image,
        size: 'large',
      }),
      nick: new Text({
        classes: 'text_title',
        text: nickName!,
        tag: 'h1',
      }),
      form: new FormUser({
        isEdit,
        emailValue: email,
        loginValue: login,
        firstNameValue: firstName,
        secondNameValue: secondName,
        nickNameValue: nickName,
        phoneValue: phone,
      }),
      change_info: new Button({
        variant: 'link',
        label: 'Change user data',
      }),
      change_pass: new Button({
        variant: 'link',
        label: 'Change password',
      }),
      sign_out: new Button({
        variant: 'link',
        label: 'Sign out',
        page: 'login',
      }),
    });
  }

  render() {
    return template;
  }
}

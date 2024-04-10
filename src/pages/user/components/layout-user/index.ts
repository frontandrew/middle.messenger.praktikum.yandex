import { Avatar, Button, Text } from 'ui';
import { Component } from 'core';

import { FormUser } from '../form-user';

import type { LayoutUserArgs, LayoutUserChildren, LayoutUserProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class LayoutUser extends Component<LayoutUserArgs, LayoutUserChildren, LayoutUserProps> {
  constructor({ image, isEdit, data }: LayoutUserArgs) {
    super({
      isEdit,
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
        text: data?.nickName,
        tag: 'h1',
      }),
      form: new FormUser({ data, isEdit }),
      change_info: new Button({
        variant: 'link',
        label: 'Change user data',
        onClick: (event: Event) => {
          this.setEditMode();
          return event;
        },
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

  setEditMode() {
    this.setProps({ isEdit: true });
    this.children.form.setEditMode(this.props.isEdit);
  }

  render() {
    return template;
  }
}

import { Button, Dialog, Text } from 'ui';
import { Component } from 'core';

import { ControlAvatar } from '../control-avatar';
import { FormAvatar } from '../form-avatar';
import { FormInfo } from '../form-info';
import { FormPass } from '../form-pass';

import type { LayoutUserArgs, LayoutUserChildren, LayoutUserProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class LayoutUser extends Component<LayoutUserArgs, LayoutUserChildren, LayoutUserProps> {
  constructor({ image, data }: LayoutUserArgs) {
    super({
      showActions: true,
      showInfo: true,
      back: new Button({
        label: '<',
        page: 'user', // TODO: > chats
      }),
      avatar: new ControlAvatar({
        image,
        disabled: false,
        onClick: () => this.children.avatarDialog?.open(),
      }),
      nick: new Text({
        classes: 'text_title',
        text: data?.nickName,
        tag: 'h1',
      }),
      formInfo: new FormInfo({ data, isEdit: false }),
      formPass: new FormPass(),
      changeInfo: new Button({
        variant: 'link',
        label: 'Change user data',
        onClick: () => this.handleEditInfo(),
      }),
      changePass: new Button({
        variant: 'link',
        label: 'Change password',
        onClick: () => this.handleEditPass(),
      }),
      signOut: new Button({
        variant: 'link',
        label: 'Sign out',
        page: 'login',
      }),
      avatarDialog: new Dialog({
        isOpen: false,
        content: new FormAvatar(),
      }),
    });
  }

  handleEditPass() {
    this.setProps({ showActions: false, showInfo: false });
  }

  handleEditInfo() {
    this.setProps({ showActions: false });
    this.children.formInfo?.setEditMode(true);
  }

  render() {
    return template;
  }
}

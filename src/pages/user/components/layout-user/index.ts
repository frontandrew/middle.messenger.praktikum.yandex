import { Button, Text } from 'ui';
import { Component } from 'core';

import { ControlAvatar } from '../control-avatar';
import { FormInfo } from '../form-info';
import { FormPass } from '../form-pass';

import type { LayoutUserArgs, LayoutUserChildren, LayoutUserMods, LayoutUserProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class LayoutUser extends Component<LayoutUserArgs, LayoutUserChildren, LayoutUserProps> {
  constructor({ image, data }: LayoutUserArgs) {
    super({
      mode: { pass: false, image: false, view: true, info: false },
      back: new Button({
        label: '<',
        page: 'login', // TODO: > chats
      }),
      avatar: new ControlAvatar({
        image,
        disabled: false,
        onClick: () => this.setMode('image'),
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
        onClick: (event: Event) => {
          this.setMode('info');
          return event;
        },
      }),
      changePass: new Button({
        variant: 'link',
        label: 'Change password',
        onClick: (event: Event) => {
          this.setMode('pass');
          return event;
        },
      }),
      signOut: new Button({
        variant: 'link',
        label: 'Sign out',
        page: 'login',
      }),
    });
  }

  setMode(mode: LayoutUserMods) {
    if (mode === 'info') {
      this.setProps({ mode: { pass: false, image: false, view: false, info: true } });
    }
    if (mode === 'pass') {
      this.setProps({ mode: { pass: true, image: false, view: false, info: false } });
    }
    if (mode === 'view') {
      this.setProps({ mode: { pass: false, image: false, view: true, info: false } });
    }
    if (mode === 'image') {
      this.setProps({ mode: { pass: false, image: true, view: true, info: false } });
    }

    this.children.formInfo?.setEditMode(this.props.mode.info);
    this.children.avatar?.setProps({ disabled: !this.props.mode.image });
  }

  render() {
    return template;
  }
}

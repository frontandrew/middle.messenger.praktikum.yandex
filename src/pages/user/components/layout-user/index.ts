import { Button, ButtonIcon, Text } from 'ui';
import { Arrow } from 'images';
import { Component } from 'core';
import { withRouter } from 'routing';
import { withStore } from 'store';

import { formatUserPassPayload, usersServ } from 'services/users';
import { authServ } from 'services/auth';

import { DialogSelectFile } from 'widgets/dialog-file-select';

import { ControlAvatar } from '../control-avatar';
import { FormInfo } from '../form-info';
import { FormPass } from '../form-pass';

import type { FormInfoData } from '../form-info';
import type { FormPassData } from '../form-pass';

import type { LayoutUserChildren, LayoutUserProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const ComponentWithRouter = withRouter(Component);
const UserNick = withStore((state) => ({ text: state.user?.nickName }))(Text);

export class LayoutUser extends ComponentWithRouter<LayoutUserChildren, LayoutUserProps> {
  constructor() {
    super({
      showActions: true,
      showInfo: true,
      back: new ButtonIcon({
        pic: Arrow,
        onClick: () => this.router.go('/messenger'),
      }),
      avatar: new ControlAvatar({
        disabled: false,
        onClick: () => this.children.avatarDialog.open(),
      }),
      nick: new UserNick({
        classes: 'user-nick',
        text: '',
        tag: 'h1',
      }),
      formInfo: new FormInfo({
        isEdit: false,
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          this.handleUserInfoChange();
          return event;
        },
      }),
      formPass: new FormPass({
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          this.handleUserPassChange();
          return event;
        },
      }),
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
        onClick: () => authServ.signOut(),
      }),
      avatarDialog: new DialogSelectFile({ isOpen: false }),
    } as LayoutUserChildren & LayoutUserProps);
  }

  handleEditPass() {
    this.children.avatar.setProps({ disabled: true });
    this.setProps({ showActions: false, showInfo: false });
  }

  handleEditInfo() {
    this.setProps({ showActions: false });
    this.children.avatar.setProps({ disabled: true });
    this.children.formInfo.setEditMode(true);
  }

  private async handleUserInfoChange() {
    const userInfo = this.children.formInfo.handleSubmit();
    if (!this.children.formInfo.props.hasError && userInfo) {
      const isUpdated = await usersServ.updateUser(userInfo as FormInfoData);

      if (isUpdated) {
        this.children.formInfo.setEditMode(false);
        this.setProps({ showActions: true, showInfo: true });
      }

      // TODO: form info error state
      // if (!isUpdated) {}
    }
  }

  private async handleUserPassChange() {
    const passData = this.children.formPass.handleSubmit() as FormPassData;
    this.validatePasswordRepeate(passData);

    if (!this.children.formPass.props.hasError && passData) {
      const isPassChanged = await usersServ.updatePass(formatUserPassPayload(passData));

      if (isPassChanged) {
        this.setProps({ showActions: true, showInfo: true });
      }

      // TODO: form pass error state
      // if (isPassChanged) {}
    }
  }

  private validatePasswordRepeate(data: FormPassData) {
    if (data.passNew !== data.passNewMore) {
      this.children.formPass.children.passNewMore
        .setProps({ hasError: true, textError: `Passwords don't match` });
      this.children.formPass.setProps({ hasError: true });
    }

    this.children.formPass.updateErrorState(this.children.formPass.props.hasError!);
  }

  render() {
    return template;
  }
}

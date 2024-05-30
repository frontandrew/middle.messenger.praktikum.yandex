import { Button, ButtonIcon, Dialog, Menu } from 'ui';
import { Component } from 'core';
import { IconAdd, IconMedia, IconPlus } from 'images';
import { withRouter } from 'routing';
import { withStore } from 'store';

import { usersServ } from 'services/users';
import { chatsServ } from 'services/chats';
import { HeaderChat } from 'entities/chat';

import { DialogSelectFile } from 'widgets/dialog-file-select';
import { SearchUsers } from 'widgets/search-users';

import {
  FormChat,
  FormMessage,
  FormSearch,
  ListChats,
  ListMessages,
  MenuAttach,
} from 'features';

import { ButtonAttach } from '../button-attach';

import type { LayoutChatsChildren, LayoutChatsProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const ComponentRS = withStore(
  (state) => ({ selectedChat: Boolean(state.chat) }),
)(withRouter(Component));

export class LayoutChats extends ComponentRS<LayoutChatsChildren, LayoutChatsProps> {
  constructor() {
    super({
      selectedChat: null,
      redirect: new Button({
        type: 'button',
        variant: 'text',
        label: 'Profile ❯',
        classes: 'text_light-color',
        onClick: () => this.router.go('/settings'),
        tabindex: 100,
      }),
      actionCreateChat: new ButtonIcon({
        pic: IconPlus,
        onClick: () => this.callCreateChatForm(),
      }),

      listChats: new ListChats(),
      listMessages: new ListMessages(),
      formSearch: new FormSearch({ fieldName: 'chats-search' }),
      formMessage: new FormMessage(),
      headerChat: new HeaderChat(),
      menuAttach: new MenuAttach(),
      dialogChatAvatar: new DialogSelectFile({
        fileSubmitHandler: async (file: File) => {
          const result = await chatsServ.changeAvatar(file);
          return result;
        },
        isOpen: false,
      }),

      actionAttach: new ButtonAttach({
        onClick: () => {
          this.callMenuAttach();
        },
      }),
      actionsChat: new ButtonIcon({
        variant: 'transparent',
        onClick: () => this.callMenuChat(),
      }),
      menuChat: new Menu({
        position: { right: 0.5, top: 4 },
        itemsProps: [
          {
            label: 'Add user',
            icon: IconAdd,
            onClick: () => this.callAddUsersDialog(),
          },
          {
            classes: 'menu-item__icon',
            label: 'Remove user',
            icon: IconAdd,
            onClick: () => this.callRemoveUsersDialog(),
          },
          {
            label: 'Change avatar',
            icon: IconMedia,
            onClick: () => this.callChatAvatarDialog(),
          },
        ],
      }),
      usersSearch: new Dialog({
        closeHandler: (): void => this.resetUsersSearch(),
        isOpen: false,
        content: new SearchUsers(),
      }),
      createChat: new Dialog({
        isOpen: false,
        content: new FormChat(),
      }),
    } as LayoutChatsChildren & LayoutChatsProps);
  }

  resetUsersSearch() {
    this.children.usersSearch.children.content.reset();
  }

  callMenuAttach() {
    this.children.menuAttach.showMenu();
  }

  callMenuChat() {
    this.children.menuChat.showMenu();
  }

  callCreateChatForm() {
    this.children.createChat.open();
  }

  callAddUsersDialog() {
    this.children.usersSearch.children.content.setProps({
      searchHandler: async (search) => {
        const users = await usersServ.searchUsers({ login: search });
        return users;
      },
      submitHandler: async (ids) => {
        const result = await chatsServ.addUsersToChat(ids);
        return result;
      },
    });
    this.children.usersSearch.children.content
      .children.action.setProps({ label: 'Add selected users' });
    this.children.usersSearch.open();
  }

  async callRemoveUsersDialog() {
    this.children.usersSearch.children.content.setProps({
      searchHandler: async (search) => {
        const users = await chatsServ.getChatUsers({ name: search, offset: 0, limit: 100 });
        return users;
      },
      submitHandler: async (ids) => {
        const result = await chatsServ.removeUsersFromChat(ids);
        return result;
      },
    });

    /* Call userSearch submit to show current chat users on open dialog */
    await this.children.usersSearch.children.content.handleUsersSearch();

    this.children.usersSearch.children.content
      .children.action.setProps({ label: 'Remove selected users' });
    this.children.usersSearch.open();
  }

  callChatAvatarDialog() {
    this.children.dialogChatAvatar.open();
  }

  render() {
    return template;
  }
}

import {
  Arrow,
  Avatar,
  Clip,
  DefaultPic,
  ImgCont,
  Menu,
  Search,
} from 'images';

import type { Props } from 'core';

import * as Pages from './pages';

const pages: Record<string, Props> = {
  login: new Pages.PageLogin(),
  reg: new Pages.PageReg(),
  404: new Pages.PageError({
    title: '404',
    message: 'Amm... There is no such page ;(',
    redirectLabel: 'Return to chats page',
    redirectTarget: 'chats',
  }),
  505: new Pages.PageError({
    title: '505',
    message: 'Ooops. Unavalible now, try later.',
    redirectLabel: 'Return to chats page',
    redirectTarget: 'chats',
  }),

  chats: [Pages.Chat, {
    userAvatar: Avatar,
    searchIcon: Search,
    arrowIcon: Arrow,
    clipIcon: Clip,
    menuIcon: Menu,
    defaultImage: DefaultPic,
    imageContent: ImgCont,
  }],

  // temp pages for example
  'user-form': [Pages.UserForm, {
    name: '$uperUser',
    userAvatar: Avatar,
    arrowIcon: Arrow,
    defaultImage: DefaultPic,
  }],

  'user-avatar': [Pages.UserAvatar, {
    name: '$uperUser',
    userAvatar: Avatar,
    arrowIcon: Arrow,
    defaultImage: DefaultPic,
  }],

  'user-password': [Pages.UserPassword, {
    name: '$uperUser',
    userAvatar: Avatar,
    arrowIcon: Arrow,
    defaultImage: DefaultPic,
  }],

  'chat-modal': [Pages.ChatModal, {
    userAvatar: Avatar,
    searchIcon: Search,
    arrowIcon: Arrow,
    clipIcon: Clip,
    menuIcon: Menu,
    defaultImage: DefaultPic,
    imageContent: ImgCont,
  }],
};

function navigate(page: string): void {
  const content = pages[page].getContent();
  const container = document.querySelector('.main');

  container.appendChild(content);
}

document.addEventListener('DOMContentLoaded', () => navigate('505'));

document.addEventListener('click', (event: Event) => {
  const targetElement = event.target as HTMLElement;
  const page = targetElement.getAttribute('page');

  if (page) {
    navigate(page);

    event.preventDefault();
    event.stopImmediatePropagation();
  }
});

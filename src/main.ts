import {
  // Arrow,
  Avatar,
  // Clip,
  // DefPic,
  // ImgCont,
  // Menu,
  // Search,
} from 'images';

import { Pages } from 'pages';
import { Templates } from 'ui';
import { registerPartials } from 'tools';

import type { PagesType } from 'pages';

registerPartials(Templates);

const pages: { [key: string]: [PagesType, Record<string, string>] } = {
  login: [Pages.PageLogin, {}],
  reg: [Pages.PageReg, {}],
  user: [Pages.PageUser, {
    image: Avatar,
    email: 'some@email.com',
    login: 'devostator777',
    firstName: 'John',
    secondName: 'Doe',
    nickName: 'Devostator',
    phone: '+66 45 955 12 12',
  }],
  404: [Pages.PageError, {
    title: '404',
    message: 'Amm... There is no such page ;(',
    redirectLabel: 'Return to chats page',
    redirectTarget: 'chats',
  }],
  505: [Pages.PageError, {
    title: '505',
    message: 'Ooops. Unavalible now, try later.',
    redirectLabel: 'Return to chats page',
    redirectTarget: 'chats',
  }],

  // chats: [Pages.Chat, {
  //   userAvatar: Avatar,
  //   searchIcon: Search,
  //   arrowIcon: Arrow,
  //   clipIcon: Clip,
  //   menuIcon: Menu,
  //   defaultImage: DefPic,
  //   imageContent: ImgCont,
  // }],

  // temp pages for example
  // 'user-form': [Pages.UserForm, {
  //   name: '$uperUser',
  //   userAvatar: Avatar,
  //   arrowIcon: Arrow,
  //   defaultImage: DefPic,
  // }],

  // 'user-avatar': [Pages.UserAvatar, {
  //   name: '$uperUser',
  //   userAvatar: Avatar,
  //   arrowIcon: Arrow,
  //   defaultImage: DefPic,
  // }],

  // 'user-password': [Pages.UserPassword, {
  //   name: '$uperUser',
  //   userAvatar: Avatar,
  //   arrowIcon: Arrow,
  //   defaultImage: DefPic,
  // }],

  // 'chat-modal': [Pages.ChatModal, {
  //   userAvatar: Avatar,
  //   searchIcon: Search,
  //   arrowIcon: Arrow,
  //   clipIcon: Clip,
  //   menuIcon: Menu,
  //   defaultImage: DefPic,
  //   imageContent: ImgCont,
  // }],
};

function navigate(page: string) {
  const [Page, context] = pages[page];
  const content = new Page(context).getContent();
  const container = document.querySelector('.main');

  container!.replaceChildren(content!);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (event: Event) => {
  const targetElement = event.target as HTMLElement;
  const page = targetElement.getAttribute('page');

  if (page) {
    navigate(page);

    event.preventDefault();
    event.stopImmediatePropagation();
  }
});

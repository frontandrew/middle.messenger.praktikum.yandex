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

import type { PagesContext, PagesType } from 'pages';

registerPartials(Templates);

const pages: { [key: string]: [PagesType, PagesContext] } = {
  unknown: [Pages.PageError, {}],
  login: [Pages.PageLogin, {
    login: 'And',
    password: '!Q1gsdgr',
  }],
  reg: [Pages.PageReg, {
    email: 'some@email.com',
    login: 'devostator777',
    firstName: 'John',
    secondName: 'Doe',
    phone: '+66 45 955 12 12',
    password: 'Q!1qwert',
    passwordMore: 'Q!1qwert',
  }],
  user: [Pages.PageUser, {
    image: Avatar,
    email: 'some@email.com',
    login: 'devostator777',
    firstName: 'John',
    secondName: 'Doe',
    nickName: 'Devostator',
    phone: '+66 45 955 12 12',
  }],
  400: [Pages.PageError, {
    title: '404',
    message: 'Amm... There is no such page ;(',
    target: 'chats',
  }],
  500: [Pages.PageError, {
    title: '505',
    message: 'Ooops. Unavalible now, try later.',
    target: 'login',
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

function navigate(page: string = 'unknown') {
  const [Page, context] = pages[page];
  const content: HTMLElement = new Page(context).getContent();
  const container = document.querySelector('.main');

  container!.replaceChildren(content);
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

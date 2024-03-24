import Handlebars from 'handlebars';

import {
  Arrow,
  Avatar,
  Clip,
  DefaultPic,
  ImgCont,
  Menu,
  Search,
} from 'images';

import * as Pages from './pages';

const pages = {
  login: new Pages.PageLogin(),
  reg: [Pages.RegPage, {}],

  user: [Pages.User, {
    name: '$uperUser',
    userAvatar: Avatar,
    arrowIcon: Arrow,
    defaultImage: DefaultPic,
  }],

  chat: [Pages.Chat, {
    userAvatar: Avatar,
    searchIcon: Search,
    arrowIcon: Arrow,
    clipIcon: Clip,
    menuIcon: Menu,
    defaultImage: DefaultPic,
    imageContent: ImgCont,
  }],

  404: [Pages.ErrorPage, {
    error: '404',
    message: 'Amm... There is no such page ;(',
  }],

  505: [Pages.ErrorPage, {
    error: '505',
    message: 'Ooops. Unavalible now, try later.',
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

function navigate(page: string) {
  const content = pages[page].getContent();
  const container = document.querySelector('.main');

  container.appendChild(content);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (event) => {
  const page = event.target.getAttribute('page');

  if (page) {
    navigate(page);

    event.preventDefault();
    event.stopImmediatePropagation();
  }
});

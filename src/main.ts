import Handlebars from 'handlebars';

import * as Pages from './pages';
import * as Components from './components';

import {
  Arrow,
  Avatar,
  Clip,
  DefaltPic,
  ImgCont,
  Menu,
  Search,
} from './assets/images';

const pages = {
  'login': [Pages.LoginPage, {}],
  'reg': [Pages.RegPage, {}],

  'user': [Pages.User, {
    name: '$uperUser',
    userAvatar: Avatar,
    arrowIcon: Arrow,
    defaultImage: DefaltPic,
  }],

  'chat': [Pages.Chat, {
    userAvatar: Avatar,
    searchIcon: Search,
    arrowIcon: Arrow,
    clipIcon: Clip,
    menuIcon: Menu,
    defaultImage: DefaltPic,
    imageContent: ImgCont,
  }],

  '404': [Pages.ErrorPage, {
    error: '404',
    message: 'Amm... There is no such page ;(',
  }],

  '505': [Pages.ErrorPage, {
    error: '505',
    message: 'Ooops. Unavalible now, try later.',
  }],

  // temp pages for example
  'user-form': [Pages.UserForm, {
    name: '$uperUser',
    userAvatar: Avatar,
    arrowIcon: Arrow,
    defaultImage: DefaltPic,
  }],

  'user-avatar': [Pages.UserAvatar, {
    name: '$uperUser',
    userAvatar: Avatar,
    arrowIcon: Arrow,
    defaultImage: DefaltPic,
  }],

  'user-password': [Pages.UserPassword, {
    name: '$uperUser',
    userAvatar: Avatar,
    arrowIcon: Arrow,
    defaultImage: DefaltPic,
  }],

  'chat-modal': [Pages.ChatModal, {
    userAvatar: Avatar,
    searchIcon: Search,
    arrowIcon: Arrow,
    clipIcon: Clip,
    menuIcon: Menu,
    defaultImage: DefaltPic,
    imageContent: ImgCont,
  }],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component)
});

function navigate(page: string) {
  const [source, context] = pages[page];
  const container = document.getElementById('app');

  container.innerHTML = Handlebars.compile(source)(context);
};

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', event => {

  const page = event.target.getAttribute('page');

  if (page) {
    navigate(page);

    event.preventDefault();
    event.stopImmediatePropagation();
  };
});

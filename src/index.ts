import Handlebars from 'handlebars';

import * as Images from './assets/images';

import * as Pages from './pages';
import * as Components from './components';

const pages = {
  'login': [Pages.LoginPage, {}],
  'reg': [Pages.RegPage, {}],
  'user': [Pages.User, { name: '$uperUser', userAvatar: Images.Avatar, arrowIcon: Images.Arrow, defaultImage: Images.DefaltImage }],
  'chat': [Pages.Chat, { searchIcon: Images.Search, arrowIcon: Images.Arrow, clipIcon: Images.Clip, menuIcon: Images.Menu, defaultImage: Images.DefaltImage, imageContent: Images.ImgCont }],
  '404': [Pages.ErrorPage, { error: '404', message: 'Amm... There is no such page ;(' }],
  '505': [Pages.ErrorPage, { error: '505', message: 'Ooops. Unavalible now, try later.' }],

  // temp pages for example
  'user-form': [Pages.UserForm, { name: '$uperUser', userAvatar: Images.Avatar, arrowIcon: Images.Arrow, defaultImage: Images.DefaltImage }],
  'user-avatar': [Pages.UserAvatar, { name: '$uperUser', userAvatar: Images.Avatar, arrowIcon: Images.Arrow, defaultImage: Images.DefaltImage }],
  'user-password': [Pages.UserPassword, { name: '$uperUser', userAvatar: Images.Avatar, arrowIcon: Images.Arrow, defaultImage: Images.DefaltImage }],
  'chat-modal': [Pages.ChatModal, { searchIcon: Images.Search, arrowIcon: Images.Arrow, clipIcon: Images.Clip, menuIcon: Images.Menu, defaultImage: Images.DefaltImage, imageContent: Images.ImgCont }],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component)
});

function navigate(page: string) {
  // @ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app');
  // @ts-ignore
  container.innerHTML = Handlebars.compile(source)(context);
};

document.addEventListener('DOMContentLoaded', () => navigate('chat'));

document.addEventListener('click', event => {
  // @ts-ignore
  const page = event.target.getAttribute('page');

  if (page) {
    navigate(page);

    event.preventDefault();
    event.stopImmediatePropagation();
  };
});

//log

document.addEventListener('click', (e) => console.log(e.target));

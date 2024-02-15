import Handlebars from 'handlebars';

import Avatar from './assets/images/avatar.jpg';

import * as Pages from './pages';
import * as Components from './components';

const pages = {
  'login': [Pages.LoginPage, {}],
  'reg': [Pages.RegPage, {}],
  'user': [Pages.User, { name: '$uperUser', userAvatar: Avatar }],
  'chat': [Pages.Chat, {}],
  '404': [Pages.ErrorPage, { error: '404', message: 'Amm... There is no such page ;(' }],
  '505': [Pages.ErrorPage, { error: '505', message: 'Ooops. Unavalible now, try later.' }],

  // temp pages for example
  'user-form': [Pages.UserForm, { name: '$uperUser', userAvatar: Avatar }],
  'user-avatar': [Pages.UserAvatar, { name: '$uperUser', userAvatar: Avatar }],
  'chat-modal': [Pages.ChatModal, {}],
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

document.addEventListener('DOMContentLoaded', () => navigate('user'));

document.addEventListener('click', event => {
  // @ts-ignore
  const page = event.target.getAttribute('page');

  if (page) {
    navigate(page);

    event.preventDefault();
    event.stopImmediatePropagation();
  };
});

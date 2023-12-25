import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';

const pages = {
  'login': [Pages.LoginPage, { test: 'Its alive!!', label: 'Lable', error: 'FUKC', value: 1988 }],
  '404': [Pages.ErrorPage, { error: '404', message: 'Amm... There is no such page ;(' }],
  '505': [Pages.ErrorPage, { error: '505', message: 'Ooops. Unavalible now, try later.' }],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component)
})

function navigate(page: string) {
  // @ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app');
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', event => {
  // @ts-ignore
  const page = event.target.getAttribute('page');

  if (page) {
    navigate(page);

    event.preventDefault();
    event.stopImmediatePropagation();
  }
});

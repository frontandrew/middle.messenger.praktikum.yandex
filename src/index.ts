import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';

const pages = {
  'login': [Pages.LoginPage, { test: 'Its alive!!', label: 'Lable', error: 'FUKC', value: 1988 }],
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

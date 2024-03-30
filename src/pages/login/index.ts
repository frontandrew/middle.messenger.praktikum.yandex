import { Button, Field, Text } from 'ui';

import { FormAuth, Layout } from './components';

export class PageLogin extends Layout {
  constructor() {
    super({
      title: new Text({
        tag: 'h1',
        text: 'Authorization',
        /**
         * TODO: Пришлось передать специальные стили через
         * конструктор блока, нужно придумать что то...
         */
        class: 'layout-content__title',
      }),
      form: new FormAuth({
        password: new Field({
          name: 'password',
          type: 'password',
          label: 'Password',
          required: true,
          value: '!Q1qwert',
        }),
        login: new Field({
          name: 'login',
          type: 'text',
          label: 'Login',
          required: true,
          value: 'And',
        }),
        submit: new Button({
          label: 'Sign in',
          type: 'submit',
        }),
        reset: new Button({
          label: 'Sign up',
          page: 'reg',
          variant: 'link',
        }),
      }),
    });
  }
}

import { Button, Field, Text } from 'ui';

import { FormReg, Layout } from './components';

export class PageReg extends Layout {
  constructor() {
    super({
      title: new Text({
        tag: 'h1',
        text: 'Registration',
        class: 'layout-content__title',
      }),
      form: new FormReg({
        email: new Field({
          name: 'email',
          type: 'email',
          label: 'Email',
          required: true,
          value: 'some@email.com',
        }),
        login: new Field({
          name: 'login',
          type: 'text',
          label: 'Login',
          textHelp: 'Only letters and numbers accepted.',
          required: true,
          value: 'devostator777',
        }),
        first_name: new Field({
          name: 'first_name',
          type: 'text',
          label: 'Name',
          required: true,
          value: 'John',
        }),
        second_name: new Field({
          name: 'second_name',
          type: 'text',
          label: 'Surname',
          value: 'Doe',
        }),
        phone: new Field({
          name: 'phone',
          type: 'phone',
          label: 'Phone',
          required: true,
          value: '+66 45 955 12',
        }),
        password: new Field({
          name: 'password',
          type: 'password',
          label: 'Password',
          required: true,
          value: '!Q1qwerty',
        }),
        password_more: new Field({
          name: 'password_more',
          type: 'password',
          label: 'Repeat password',
          required: true,
          value: 'cvakjvcl',
        }),
        submit: new Button({
          label: 'Register',
          type: 'submit',
        }),
        reset: new Button({
          label: 'Sign in',
          page: 'login',
          variant: 'link',
        }),
      }),
    });
  }
}

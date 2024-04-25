import { Button, Field, Form } from 'ui';

import type { FormAuthChildren, FormAuthData, FormAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormAuth extends Form<FormAuthChildren, FormAuthProps> {
  constructor(data: FormAuthData) {
    super({
      data,
      login: new Field({
        name: 'login',
        type: 'text',
        label: 'Login',
        required: true,
        value: data.login,
      }),
      password: new Field({
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        value: data.password,
      }),
      submit: new Button({
        label: 'Sign in',
        type: 'submit',
      }),
      redirect: new Button({
        label: 'Sign up',
        page: 'reg',
        variant: 'link',
      }),
    } as FormAuthChildren & FormAuthProps);
  }

  render() {
    return template;
  }
}

export type { FormAuthChildren, FormAuthData, FormAuthProps };

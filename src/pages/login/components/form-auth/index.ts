import { Button, Field, Form } from 'ui';

import type { FormAuthArgs, FormAuthChildren, FormAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormAuth extends Form<FormAuthChildren, FormAuthProps> {
  constructor({ data }: FormAuthArgs) {
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
    });
  }

  render() {
    return template;
  }
}

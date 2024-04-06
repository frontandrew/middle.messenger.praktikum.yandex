import { Button, Field, Form } from 'ui';

import type { FormAuthChildren, FormAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormAuth extends Form<FormAuthChildren, FormAuthProps> {
  constructor({ login = '', password = '' }: FormAuthProps) {
    super({ login, password });
  }

  createChildren(): void {
    const { login, password } = this.props;
    this.children = {
      login: new Field({
        name: 'login',
        type: 'text',
        label: 'Login',
        required: true,
        value: login,
      }),
      password: new Field({
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        value: password,
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
      reset: new Button({
        label: 'Sign up',
        page: 'reg',
        variant: 'link',
      }),
    };
  }

  render() {
    return template;
  }
}

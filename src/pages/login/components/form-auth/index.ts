import { Button, Field, Form } from 'ui';

import template from './template.hbs?raw';
import './style.css';

export class FormAuth extends Form<object, object, object> {
  constructor(args) {
    super({
      login: new Field({
        name: 'login',
        type: 'text',
        label: 'Login',
        required: true,
        value: 'And',
      }),
      password: new Field({
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        value: '!Q1qwert',
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
    });
  }

  render() {
    return template;
  }
}

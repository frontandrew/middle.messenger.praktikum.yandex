import { Button, Field, Form } from 'ui';
import { Router } from 'routing';

import type { FormAuthChildren, FormAuthData, FormAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormAuth extends Form<FormAuthChildren, FormAuthProps> {
  constructor(data: FormAuthData) {
    super({
      data,
      onSubmit: (event: Event) => {
        event.stopPropagation();
        this.handleLogin();
        return event;
      },
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

  handleLogin(): void {
    this.handleSubmit();
    if (!this.props.hasError) {
      const router = new Router();
      router.go('/chats');
    }
  }

  render() {
    return template;
  }
}

export type { FormAuthChildren, FormAuthData, FormAuthProps };

import { Button, Field, Form } from 'ui';
import { withRouter } from 'routing';

import type { FormAuthChildren, FormAuthData, FormAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const FormWithRouter = withRouter(Form);

export type { FormAuthChildren, FormAuthData, FormAuthProps };

export class FormAuth extends FormWithRouter<FormAuthChildren, FormAuthProps> {
  constructor(data: FormAuthData) {
    super({
      data,
      onSubmit: (event: Event) => {
        event.preventDefault();
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
    } as FormAuthChildren & FormAuthProps);
  }

  handleLogin(): void {
    this.handleSubmit();
    if (!this.props.hasError) {
      this.router.go('/chats');
    }
  }

  render() {
    return template;
  }
}

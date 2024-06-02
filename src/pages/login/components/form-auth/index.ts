import { Button, Field, Form } from 'ui';
import { authServ } from 'services/auth';
import type { AuthPayload } from 'apis/auth';

import type { FormAuthChildren, FormAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { FormAuthChildren, FormAuthProps };

export class FormAuth extends Form<FormAuthChildren, FormAuthProps> {
  constructor(props?: FormAuthProps) {
    super({
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
      }),
      password: new Field({
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
      }),
      submit: new Button({
        label: 'Sign in',
        type: 'submit',
      }),
      ...props,
    } as FormAuthChildren & FormAuthProps);
  }

  async handleLogin(): Promise<void> {
    const credantials = this.handleSubmit() as AuthPayload;
    if (!this.props.hasError) {
      authServ.singIn(credantials);
    }
  }

  render() {
    return template;
  }
}

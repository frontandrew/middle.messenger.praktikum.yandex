import { Button, Field, Form } from 'ui';
import { withRouter } from 'routing';

import { AuthController } from '../../controller';

import type { FormAuthChildren, FormAuthData, FormAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const FormWithRouter = withRouter(Form);

export type { FormAuthChildren, FormAuthData, FormAuthProps };

export class FormAuth extends FormWithRouter<FormAuthChildren, FormAuthProps> {
  control = new AuthController();
  constructor() {
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
    } as FormAuthChildren & FormAuthProps);
  }

  async handleLogin(): Promise<void> {
    const credantials = this.handleSubmit() as FormAuthData;
    if (!this.props.hasError) {
      const isAuth = await this.control.singIn(credantials);
      if (isAuth) this.router.go('/messenger');
    }
  }

  render() {
    return template;
  }
}

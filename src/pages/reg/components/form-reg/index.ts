import { Button, Field, Form } from 'ui';
import { withRouter } from 'routing';

import type { FormRegChildren, FormRegData, FormRegProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { FormRegChildren, FormRegData, FormRegProps };

const FormWithRouter = withRouter(Form);

export class FormReg extends FormWithRouter<FormRegChildren, FormRegProps> {
  constructor(data: FormRegData) {
    super({
      data,
      onSubmit: (event: Event) => {
        event.preventDefault();
        this.handleRegistration();
        return event;
      },

      email: new Field({
        name: 'email',
        type: 'text',
        label: 'Email',
        required: true,
        value: data?.email,
      }),
      login: new Field({
        name: 'login',
        type: 'text',
        label: 'Login',
        textHelp: 'Only letters and numbers accepted.',
        required: true,
        value: data?.login,
      }),
      firstName: new Field({
        name: 'first_name',
        type: 'text',
        label: 'Name',
        required: true,
        value: data?.firstName,
      }),
      secondName: new Field({
        name: 'second_name',
        type: 'text',
        label: 'Surname',
        value: data?.secondName,
      }),
      phone: new Field({
        name: 'phone',
        type: 'text',
        label: 'Phone',
        required: true,
        value: data?.phone,
      }),
      password: new Field({
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        value: data?.password,
      }),
      passwordMore: new Field({
        name: 'password_more',
        type: 'password',
        label: 'Repeat password',
        required: true,
        value: data?.passwordMore,
      }),
      submit: new Button({
        label: 'Register',
        type: 'submit',
      }),
    } as FormRegChildren & FormRegProps);
  }

  handleRegistration(): void {
    this.handleSubmit();
    if (!this.props.hasError) {
      this.router.go('/settings');
    }
  }

  render() {
    return template;
  }
}

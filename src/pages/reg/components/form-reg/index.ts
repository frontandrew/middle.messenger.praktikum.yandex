import { Button, Field, Form } from 'ui';

import { usersServ as serv } from 'services/users';

import type { FormRegChildren, FormRegData, FormRegProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { FormRegChildren, FormRegData, FormRegProps };

export class FormReg extends Form<FormRegChildren, FormRegProps> {
  constructor(props: FormRegProps) {
    super({
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
      }),
      login: new Field({
        name: 'login',
        type: 'text',
        label: 'Login',
        textHelp: 'Only letters and numbers accepted.',
        required: true,
      }),
      firstName: new Field({
        name: 'first_name',
        type: 'text',
        label: 'Name',
        required: true,
      }),
      secondName: new Field({
        name: 'second_name',
        type: 'text',
        label: 'Surname',
        required: true,
      }),
      phone: new Field({
        name: 'phone',
        type: 'text',
        label: 'Phone',
        required: true,
      }),
      password: new Field({
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
      }),
      passwordMore: new Field({
        name: 'password_more',
        type: 'password',
        label: 'Repeat password',
        required: true,
      }),
      submit: new Button({
        label: 'Register',
        type: 'submit',
      }),
      ...props,
    } as FormRegChildren & FormRegProps);
  }

  handleRegistration() {
    const regData = this.handleSubmit() as FormRegData;

    if (regData) {
      this.validatePasswordRepeate(regData);
    }
    if (!this.props.hasError) {
      serv.regUser(regData);
    }
  }

  validatePasswordRepeate(data: FormRegData) {
    if (data.passwordMore !== data.password) {
      this.children.passwordMore.setProps({ hasError: true, textError: `Passwords don't match` });
      this.setProps({ hasError: true });
    }

    this.updateErrorState(this.props.hasError!);
  }

  render() {
    return template;
  }
}

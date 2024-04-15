import { Button, Field, Form } from 'ui';

import type { FormRegArgs, FormRegChildren, FormRegProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormReg extends Form<FormRegChildren, FormRegProps> {
  constructor({ data }: FormRegArgs) {
    super({
      data,
      email: new Field({
        name: 'email',
        type: 'email',
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
      first_name: new Field({
        name: 'first_name',
        type: 'text',
        label: 'Name',
        required: true,
        value: data?.firstName,
      }),
      second_name: new Field({
        name: 'second_name',
        type: 'text',
        label: 'Surname',
        value: data?.secondName,
      }),
      phone: new Field({
        name: 'phone',
        type: 'tel',
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
      password_more: new Field({
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
      redirect: new Button({
        label: 'Sign in',
        page: 'login',
        variant: 'link',
      }),
    });
  }

  render() {
    return template;
  }
}

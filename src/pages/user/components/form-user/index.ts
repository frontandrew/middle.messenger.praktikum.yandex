import { Button, Field, Form } from 'ui';

import type { FormUserArgs, FormUserChildren, FormUserProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormUser extends Form<FormUserArgs, FormUserChildren, FormUserProps> {
  constructor({ data, isEdit }: FormUserArgs) {
    super({
      isEdit,

      email: new Field({
        name: 'email',
        type: 'email',
        label: 'Email',
        value: data?.email,
        inline: true,
        disabled: !isEdit,
      }),
      login: new Field({
        name: 'login',
        type: 'text',
        label: 'Login',
        value: data?.login,
        inline: true,
        disabled: !isEdit,
      }),
      first_name: new Field({
        name: 'first_name',
        type: 'text',
        label: 'Name',
        value: data?.firstName,
        inline: true,
        disabled: !isEdit,
      }),
      second_name: new Field({
        name: 'second_name',
        type: 'text',
        label: 'Surname',
        value: data?.secondName,
        inline: true,
        disabled: !isEdit,
      }),
      nick_name: new Field({
        name: 'nick_name',
        type: 'text',
        label: 'Nickname',
        value: data?.nickName,
        inline: true,
        disabled: !isEdit,
      }),
      phone: new Field({
        name: 'phone',
        type: 'tel',
        label: 'Phone',
        value: data?.phone,
        inline: true,
        disabled: !isEdit,
      }),
      submit: new Button({
        variant: 'filled',
        label: 'Save',
        type: 'submit',
      }),
    });
  }

  render() {
    return template;
  }
}

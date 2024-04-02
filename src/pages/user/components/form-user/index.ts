import { Button, Field, Form } from 'ui';

import type { FormUserArgs, FormUserChildren, FormUserProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormUser extends Form<FormUserArgs, FormUserChildren, FormUserProps> {
  constructor(args: FormUserArgs) {
    const {
      emailValue,
      loginValue,
      firstNameValue,
      secondNameValue,
      nickNameValue,
      phoneValue,
      isEdit,
    } = args;

    super({
      isEdit: isEdit ?? false,

      email: new Field({
        name: 'email',
        type: 'email',
        label: 'Email',
        value: emailValue,
        inline: true,
        disabled: !isEdit,
      }),
      login: new Field({
        name: 'login',
        type: 'text',
        label: 'Login',
        value: loginValue,
        inline: true,
        disabled: !isEdit,
      }),
      first_name: new Field({
        name: 'first_name',
        type: 'text',
        label: 'Name',
        value: firstNameValue,
        inline: true,
        disabled: !isEdit,
      }),
      second_name: new Field({
        name: 'second_name',
        type: 'text',
        label: 'Surname',
        value: secondNameValue,
        inline: true,
        disabled: !isEdit,
      }),
      nick_name: new Field({
        name: 'nick_name',
        type: 'text',
        label: 'Nickname',
        value: nickNameValue,
        inline: true,
        disabled: !isEdit,
      }),
      phone: new Field({
        name: 'phone',
        type: 'tel',
        label: 'Phone',
        value: phoneValue,
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

import { Button, Field, Form } from 'ui';

import type { FormInfoChildren, FormInfoData, FormInfoProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormInfo extends Form<FormInfoChildren, FormInfoProps> {
  constructor({ data, isEdit }: FormInfoProps) {
    super({
      data,
      isEdit,

      email: new Field({
        name: 'email',
        type: 'text',
        label: 'Email',
        inline: true,
        value: data?.email,
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
      firstName: new Field({
        name: 'first_name',
        type: 'text',
        label: 'Name',
        inline: true,
        value: data?.firstName,
        disabled: !isEdit,
      }),
      secondName: new Field({
        name: 'second_name',
        type: 'text',
        label: 'Surname',
        inline: true,
        value: data?.secondName,
        disabled: !isEdit,
      }),
      nickName: new Field({
        name: 'display_name',
        type: 'text',
        label: 'Nickname',
        inline: true,
        value: data?.nickName,
        disabled: !isEdit,
      }),
      phone: new Field({
        name: 'phone',
        type: 'text',
        label: 'Phone',
        inline: true,
        value: data?.phone,
        disabled: !isEdit,
      }),
      submit: new Button({
        label: 'Save',
        type: 'submit',
      }),
    } as FormInfoChildren & FormInfoProps);
  }

  setEditMode(mode: boolean) {
    this.setProps({ isEdit: mode });

    Object.values(this.children).forEach((child) => {
      if (child instanceof Field) {
        child.setDisabledState(!this.props.isEdit);
      }
    });
  }

  render() {
    return template;
  }
}

export type { FormInfoChildren, FormInfoProps, FormInfoData };

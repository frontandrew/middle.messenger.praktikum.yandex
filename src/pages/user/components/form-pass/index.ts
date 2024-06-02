import { Button, Field, Form } from 'ui';

import type { FormPassChildren, FormPassData, FormPassProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { FormPassChildren, FormPassData, FormPassProps };

export class FormPass extends Form<FormPassChildren, FormPassProps> {
  constructor({ onSubmit }: FormPassProps) {
    super({
      onSubmit,
      passCurr: new Field({
        name: 'oldPassword',
        type: 'password',
        label: 'Current password',
        inline: true,
        required: true,
      }),
      passNew: new Field({
        name: 'newPassword',
        type: 'password',
        label: 'New password',
        inline: true,
        required: true,
      }),
      passNewMore: new Field({
        name: 'password_more',
        type: 'password',
        label: 'Repeat new password',
        inline: true,
        required: true,
      }),
      submit: new Button({
        label: 'Save',
        type: 'submit',
      }),
    } as FormPassChildren & FormPassProps);
  }

  render() {
    return template;
  }
}

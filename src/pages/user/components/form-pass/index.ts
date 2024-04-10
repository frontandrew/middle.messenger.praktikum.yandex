import { Button, Field, Form } from 'ui';

import type { FormPassArgs, FormPassChildren, FormPassProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormPass extends Form<FormPassArgs, FormPassChildren, FormPassProps> {
  constructor() {
    super({
      passCurr: new Field({
        name: 'password',
        type: 'password',
        label: 'Current password',
        inline: true,
        required: true,
      }),
      passNew: new Field({
        name: 'password_new',
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
    });
  }

  render() {
    return template;
  }
}

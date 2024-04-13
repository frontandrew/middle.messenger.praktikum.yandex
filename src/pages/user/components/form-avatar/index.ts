import { Button, Form } from 'ui';

import type { FormAvatarArgs, FormAvatarChildren, FormAvatarProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormAvatar extends Form<FormAvatarArgs, FormAvatarChildren, FormAvatarProps> {
  constructor() {
    super({
      submit: new Button({
        type: 'submit',
        label: 'Cange',
      }),
    });
  }

  render() {
    return template;
  }
}

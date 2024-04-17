import { Button, Field, Form, Text } from 'ui';

import type { FormAvatarChildren, FormAvatarProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormAvatar extends Form<FormAvatarChildren, FormAvatarProps> {
  constructor(args) {
    super({
      title: new Text({ text: 'Load image', tag: 'h2', classes: 'form__title' }),
      file: new Field({
        name: 'avatar',
        label: 'Select image from your computer',
        type: 'file',

      }),
      submit: new Button({
        type: 'submit',
        label: 'Cange',
      }),
      error: new Text({
        text: 'You need to select a file',
        classes: 'form__error text_error-color',
      }),

      ...args,
    } as FormAvatarChildren);
  }

  render() {
    return template;
  }
}

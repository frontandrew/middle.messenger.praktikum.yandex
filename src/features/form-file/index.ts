import { Button, Field, Form, Text } from 'ui';

import type { FormFileChildren, FormFileProps } from './type';
import template from './template.hbs?raw';
import './style.css';

// TODO: make this file form
export class FormFile extends Form<FormFileChildren, FormFileProps> {
  constructor(props: FormFileProps) {
    super({
      hasError: false,
      title: new Text({ text: 'Load file', tag: 'h2', classes: 'form-file__title' }),
      file: new Field({
        name: 'avatar',
        label: 'Select file from your computer',
        type: 'file',
        accept: 'image/*',
        tabindex: 1,
        autofocus: true,
      }),
      submit: new Button({
        type: 'submit',
        label: 'Change',
        tabindex: 2,
      }),
      error: new Text({
        text: 'This file cant be loaded, try another one',
        classes: 'form-file__error text_error-color text_label',
      }),
      ...props,
    } as FormFileChildren & FormFileProps);
  }

  render() {
    return template;
  }
}

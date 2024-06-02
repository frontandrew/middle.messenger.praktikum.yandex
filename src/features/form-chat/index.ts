import { Button, Field, Form, Text } from 'ui';

import type { FormChatChildren, FormChatProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { FormChatChildren, FormChatProps };

export class FormChat extends Form<FormChatChildren, FormChatProps> {
  constructor(props?: FormChatProps) {
    super({
      title: new Text({
        text: 'Create new chat',
        tag: 'h2',
        classes: 'form-chat__title',
      }),
      chatTitle: new Field({
        name: 'chatTitle',
        type: 'text',
        label: 'Chat title',
        required: true,
        autofocus: true,
        tabindex: 1,
      }),
      submit: new Button({
        label: 'Create',
        type: 'submit',
        tabindex: 2,
      }),
      error: new Text({
        text: 'Cant create chat, try anoter name',
        classes: 'form-chat__error text_error-color text_label',
      }),
      ...props,
    } as FormChatChildren & FormChatProps);
  }

  render() {
    return template;
  }
}

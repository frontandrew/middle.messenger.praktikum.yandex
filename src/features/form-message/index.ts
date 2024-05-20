import { ButtonIcon, Field, Form } from 'ui';
import { Arrow } from 'images';

import type { FormMessageChildren, FormMessageProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class FormMessage extends Form<FormMessageChildren, FormMessageProps> {
  constructor() {
    super({
      message: new Field({
        classes: 'form-message__field',
        type: 'simple',
        name: 'message',
        placeholder: 'Message',
      }),
      submit: new ButtonIcon({
        classes: 'form-message__submit',
        type: 'submit',
        pic: Arrow,
      }),
      onSubmit: (event) => {
        event.preventDefault();
        this.handleMessageSubmit();
        return event;
      },
    } as FormMessageChildren & FormMessageProps);
  }

  handleMessageSubmit() {
    if (!this.children.message.children.input.value) return;

    this.handleSubmit();
    this.children.message.reset();
  }

  render(): string {
    return template;
  }
}
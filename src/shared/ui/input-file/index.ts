import { Input, Text } from 'ui';

import type { InputFileChildren, InputFileProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { InputFileChildren, InputFileProps };

/**
 * Uses for file select, extended from `atoms/input`
 */

export class InputFile extends Input<InputFileChildren, InputFileProps> {
  constructor({
    name,
    label = 'Selct file',
    onInput = (event: InputEvent) => {
      this.handleFileSelect(event);
      return event;
    },
    ...inputProps
  }: InputFileProps) {
    super({
      label,
      name,

      input: new Input({
        classes: 'input-file__input',
        onInput,
        name,
        ...inputProps,
      }),
      fileName: new Text({
        classes: 'input-file__name text_disabled-color',
        text: '',
        tag: 'p',
      }),
      labelText: new Text({
        classes: 'input-file__label text_main-color',
        text: label,
      }),
    } as InputFileProps & InputFileChildren);
  }

  handleFileSelect({ target }: InputEvent) {
    if (!(target instanceof HTMLInputElement)) return;
    this.setProps({ value: target.files![0].name });
    this.children.fileName.setProps({ text: this.props.value });
  }

  reset() {
    this.setProps({ value: '' });
  }

  render() {
    return template;
  }
}

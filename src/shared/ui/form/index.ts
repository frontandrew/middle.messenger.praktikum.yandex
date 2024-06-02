import { Button, ButtonIcon, Field } from 'ui';
import { Component } from 'core';

import type { FormChildren, FormProps } from './type';
import './style.css';

export class Form<C extends FormChildren, P extends FormProps>
  extends Component<C, P> {
  constructor({
    disabled = false,
    hasError = false,

    onInput = (event: InputEvent) => {
      this.updateErrorState(false);
      return event;
    },
    onReset = (event: Event) => {
      this.reset();
      return event;
    },
    onSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      this.handleSubmit();
      return event;
    },

    ...rest
  }: C & P) {
    super({
      disabled,
      hasError,
      onInput,
      onReset,
      onSubmit,

      ...rest,
    } as C & P);
  }

  handleSubmit(): PlainObject | undefined {
    this.validate();
    this.props.hasError = this.getErrorState();

    if (!this.props.hasError) {
      return this.submitForm();
    }

    this.updateErrorState(this.props.hasError);
    return undefined;
  }

  reset() {
    Object.values(this.children)
      .filter((child) => child instanceof Button
      || child instanceof ButtonIcon
      || child instanceof Field)
      .forEach((child) => {
        (child as Button | ButtonIcon | Field).reset();
      });

    this.updateErrorState(false);
  }

  getErrorState() {
    const errorState: boolean = Object.values(this.children)
      .filter((child) => child instanceof Field)
      .some((child) => child.props.hasError);

    return errorState;
  }

  updateErrorState(state: boolean) {
    if (this.children.submit) {
      this.children.submit.setDisabled(state);
    }
  }

  validate() {
    Object.values(this.children).forEach((child) => {
      if (child instanceof Field) child.handleValidation();
    });
  }

  submitForm(): PlainObject {
    const submitted = Object
      .entries(this.children)
      .reduce((acc, [key, child]) => {
        if (child instanceof Field && child.props.type !== 'file') {
          return ({ ...acc, [key]: child.value });
        }

        if (child instanceof Field && child.props.type === 'file' && child.file instanceof File) {
          return { ...acc, [key]: child.file };
        }

        return acc;
      }, {});

    console.warn(`SBMT{${this.count}}:[${this.instance}:${this.id}]:`, submitted);
    return submitted;
  }
}

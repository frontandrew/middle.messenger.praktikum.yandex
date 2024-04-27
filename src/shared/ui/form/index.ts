import { Button, ButtonIcon, Field } from 'ui';
import { Component } from 'core';

import type { FormChildren, FormProps } from './type';
import './style.css';

export abstract class Form<C extends FormChildren, P extends FormProps>
  extends Component<C, P> {
  constructor({
    disabled = false,
    hasError = false,

    onInput = (event: Event) => {
      this.updateErrorState(false);
      return event;
    },
    onReset = (event: Event) => {
      this.reset();
      return event;
    },
    onSubmit = (event: Event) => {
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

  handleSubmit() {
    this.validate();
    this.props.hasError = this.getErrorState();

    if (!this.props.hasError) {
      this.submitForm();
    }

    this.updateErrorState(this.props.hasError);
  }

  reset() {
    Object.values(this.children)
      .filter((child) => child instanceof Button
      || child instanceof ButtonIcon
      || child instanceof Field)
      .forEach((child) => {
        child.reset();
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
    this.children.submit?.setDisabled(state);
  }

  validate() {
    Object.values(this.children).forEach((child) => {
      if (child instanceof Field) child.handleValidation();
    });
  }

  submitForm() {
    const submitted = Object.entries(this.children).reduce(
      (acc, [key, child]) => {
        if (child instanceof Field) return ({ ...acc, [key]: child.children.input.value });
        return acc;
      },
      {},
    );

    console.warn(`SBMT{${this.count}}:[${this.instance}:${this.id}]:`, submitted);
  }
}

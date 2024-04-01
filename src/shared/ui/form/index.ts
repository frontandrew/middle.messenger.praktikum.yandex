import { Component } from 'core';
import { Field } from 'ui';

import type { FormArgs, FormChildren, FormProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Form<A extends FormArgs, C extends FormChildren, P extends FormProps>
  extends Component<A, C, P> {
  public hasError = false;

  constructor(args: A) {
    super({
      onSubmit: (event: Event) => {
        event.preventDefault();
        this.handleSubmit();
        return event;
      },
      onReset: () => this.resetForm(),
      onInput: () => this.updateErrorState(false),

      ...args,
    });

    this.hasError = this.props.hasError;
  }

  handleSubmit() {
    this.validate();
    this.hasError = this.getErrorState();

    if (!this.hasError) {
      this.submitForm();
    }

    this.updateErrorState(this.hasError);
  }

  resetForm() {
    Object.values(this.children).forEach((child) => {
      child.resetState();
    });

    this.updateErrorState(false);
  }

  getErrorState() {
    const errorState: boolean = Object.values(this.children)
      .reduce((acc: boolean[], child) => {
        if (child instanceof Field) return [...acc, child.props.hasError];
        return acc;
      }, [])
      .some(Boolean);

    return errorState;
  }

  updateErrorState(state: boolean) {
    this.children.submit.setDisabled(state);
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

    console.warn(`FORM "${this.instance}" SUBMITTED:`, submitted);
  }

  render() {
    return template;
  }
}

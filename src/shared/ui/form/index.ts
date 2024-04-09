import { Button, Field } from 'ui';
import { Component } from 'core';

import type { FormArgs, FormChildren, FormData, FormProps } from './type';
import './style.css';

export abstract class Form<A extends FormArgs, C extends FormChildren, P extends FormProps>
  extends Component<A, C, P> {
  constructor({
    data = {},
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

    submit = new Button({ label: 'Submit', type: 'submit' }),

    ...rest
  }: A) {
    super({
      data,
      disabled,
      hasError,
      onInput,
      onReset,
      onSubmit,
      submit,
      ...rest,
    });
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
    Object.values(this.children).forEach((child) => {
      child!.reset();
    });

    this.updateErrorState(false);
  }

  getErrorState() {
    const errorState: boolean = Object.values(this.children)
      ?.reduce((acc: boolean[], child) => {
        if (child instanceof Field) return [...acc, child.props.hasError];
        return acc;
      }, [])
      ?.some(Boolean);

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
    // TODO: > navigate()
  }
}

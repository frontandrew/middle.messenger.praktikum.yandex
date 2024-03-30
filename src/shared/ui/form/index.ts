import Handlebars from 'handlebars';

import { Component } from 'core';

import type { FormArgs, FormProps } from './type';
import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Form', template);

export class Form extends Component<FormProps> {
  public hasError = false;

  constructor(props: FormArgs) {
    super({
      onSubmit: (event: Event) => {
        event.preventDefault();
        this.handleSubmit();
        return event;
      },
      onReset: () => this.resetForm(),
      onInput: () => this.updateErrorState(false),

      ...props,
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
    const errorState: boolean = Object.values(this.getInputChildren(this))
      .reduce((acc, child) => [...acc, child.props.hasError], [])
      .some(Boolean);

    return errorState;
  }

  updateErrorState(state: boolean) {
    // this.hasError = state;
    this.children.submit.setDisabled(state);
  }

  validate() {
    Object.values(this.getInputChildren(this)).forEach((child) => {
      child.handleValidation();
    });
  }

  getInputChildren(component) {
    const inputs = Object.entries(component.children).reduce(
      (acc, [key, value]) => {
        if (value.instance === 'Field') {
          return { ...acc, [key]: value };
        }

        /**
         * можно попробовать сделать рекурсивный обход всех потомков
         * передав на вход инстанс компонента
         *
         * UPD: реализовано, не тестировал
         */
        if (Object.keys(value.children) > 0) {
          return { ...acc, ...this.getInputChildren(value) };
        }

        return acc;
      },
      {},
    );
    return inputs;
  }

  submitForm() {
    const submitted = Object.entries(this.getInputChildren(this)).reduce(
      (acc, [key, child]) => ({ ...acc, [key]: child.props.value }),
      {},
    );

    console.warn(`FORM SUBMITTED:`, submitted);
  }

  render() {
    return template;
  }
}

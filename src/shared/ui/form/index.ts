import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css';

import Handlebars from 'handlebars';

Handlebars.registerPartial('Form', template);

export class Form extends Component {
  constructor(props = {}) {
    super({
      // onSubmit: (event) => {
      //   event.preventDefault();
      //   event.stopPropagation();
      //   this.processEvents(event);
      //   return event;
      // },
      // onChange: (event) => {
      //   this.processEvents(event);
      //   return event;
      // },
      // onReset: (event) => {
      //   this.processEvents(event);
      //   return event;
      // },
      // onInput: (event) => {
      //   this.processEvents(event);
      //   return event;
      // },

      ...props,
    });

    this.hasError = false;
  }

  processEvents(event) {
    console.log('Event:', event)
    if (event.type === 'input') {
      this.updateErrorState(false);
      return;
    }

    if (event.type === 'change') {
      this.updateErrorState(this.getErrorState());
      return;
    }

    if (event.type === 'submit') {
      this.validate();
      this.updateErrorState(this.getErrorState());

      if (!this.hasError) this.submitForm();
      return;
    }

    if (event.type === 'reset') {
      this.resetForm();
    }
  }

  // setSubmitState() {
  //   this.children.submit.setDisabled(this.hasError);
  // }

  // getErrorState() {
  //   const errorState = Object.values(this.getInputChildren(this))
  //     .reduce((acc, child) => [...acc, child.props.hasError], [])
  //     .some(Boolean);

  //   return errorState;
  // }

  // updateErrorState(state) {
  //   this.hasError = state;
  //   this.setSubmitState();
  // }

  // validate() {
  //   Object.values(this.getInputChildren(this)).forEach((child) => {
  //     child.validate();
  //   });
  // }

  // getInputChildren(component) {
  //   const inputs = Object.entries(component.children).reduce(
  //     (acc, [key, value]) => {
  //       if (value.instance === 'Field') {
  //         return { ...acc, [key]: value };
  //       }

  //       /**
  //        * можно попробовать сделать рекурсивный обход всех потомков
  //        * передав на вход инстанс компонента
  //        *
  //        * UPD: реализовано, не тестировал
  //        */
  //       if (Object.keys(value.children) > 0) {
  //         return { ...acc, ...this.getInputChildren(value) };
  //       }

  //       return acc;
  //     },
  //     {},
  //   );
  //   return inputs;
  // }

  // resetForm() {
  //   Object.values(this.children).forEach((child) => {
  //     child.reset();
  //   });

  //   this.updateErrorState(false);
  // }

  // submitForm() {
  //   const submitted = Object.entries(this.getInputChildren(this)).reduce(
  //     (acc, [key, child]) => ({ ...acc, [key]: child.props.value }),
  //     {},
  //   );

  //   console.warn(`FORM SUBMITTED:`, submitted);
  // }

  render() {
    return template;
  }
}

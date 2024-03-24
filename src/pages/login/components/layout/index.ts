import { Button, Field, Text } from 'ui';
import { Component } from 'core';

import { FormAuth } from '../form-auth';

import template from './template.hbs?raw';
import './style.css';

export class Layout extends Component {
  constructor({ title, form, ...layoutProps }) {
    const { submit, reset, login, password, ...formProps } = form;
    super({
      title: new Text(title),
      form: new FormAuth({
        submit: new Button(submit),
        reset: new Button(reset),
        login: new Field(login),
        password: new Field(password),

        ...formProps,
      }),

      ...layoutProps,
    });
  }

  render() {
    return template;
  }
}

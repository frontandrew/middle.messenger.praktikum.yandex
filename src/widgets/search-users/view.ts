import { FormSearch, ListUsers } from 'features';
import { Button, Text } from 'ui';
import { Component } from 'core';

import type { SearchUsersChildren, SearchUsersProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class SearchUsers extends Component<SearchUsersChildren, SearchUsersProps> {
  constructor(props?: SearchUsersProps) {
    super({
      form: new FormSearch({
        fieldName: 'user-search',
        autofocus: true,
        tabindex: 1,
      }),
      list: new ListUsers(),
      action: new Button({
        label: 'Add users',
        tabindex: 50,
      }),
      message: new Text({ text: '' }),
      ...props,
    });
  }

  render(): string {
    return template;
  }
}

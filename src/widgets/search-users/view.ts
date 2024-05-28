import { Button, Text } from 'ui';
import { Component } from 'core';

import { FormSearch, ListUsers } from 'features';
import { UserType } from 'entities/user';
import { usersServ } from 'services/users';

import type { SearchUsersChildren, SearchUsersProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class SearchUsers extends Component<SearchUsersChildren, SearchUsersProps> {
  constructor(props?: SearchUsersProps) {
    super({
      hasntUsers: false,
      form: new FormSearch({
        fieldName: 'user-search',
        autofocus: true,
        tabindex: 1,
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          this.handleSearchSubmit();
          return event;
        },
      }),
      list: new ListUsers(),
      action: new Button({
        label: 'Add users',
        tabindex: 50,
        disabled: true,
      }),
      message: new Text({
        text: 'There is no users found, try another request',
        classes: 'search-user__message text_error-color text_label',
      }),
      ...props,
    } as SearchUsersChildren & SearchUsersProps);
  }

  async handleSearchSubmit() {
    const data = this.children.form.handleSubmit();

    if (typeof data?.search === 'string') {
      const result = await usersServ.searchUsers({ login: data.search });

      if (!result.length) {
        this.children.list.setProps({ items: {} });
        this.children.action.setProps({ disabled: true });
        this.setProps({ hasntUsers: true });
        return;
      }

      const items = result.reduce((res, item) => ({
        ...res,
        [item.id]: item,
      }), {} as Record<string, UserType>);

      this.children.list.setProps({ items });
      this.children.action.setProps({ disabled: false });
      this.setProps({ hasntUsers: false });
    }
  }

  reset() {
    this.children.form.children.search.setProps({ value: '' });
    this.children.action.setProps({ disabled: true });
    this.children.list.setProps({ items: {} });
    this.setProps({ hasntUsers: false });
  }

  render(): string {
    return template;
  }
}

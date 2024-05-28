import { Button, Text } from 'ui';
import { Component } from 'core';

import { FormSearch, ListUsers } from 'features';
import { ItemUserProps } from 'entities/user';
import { usersServ } from 'services/users';
import { chatsServ } from 'services/chats';

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
        onClick: () => this.addUsersToChat(),
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
        [item.id]: { ...item, isSelected: false },
      }), {} as Record<string, ItemUserProps>);

      this.children.list.setProps({ items });
      this.children.action.setProps({ disabled: false });
      this.setProps({ hasntUsers: false });
    }
  }

  async addUsersToChat() {
    const { items } = this.children.list.props;
    if (!items) {
      /* TODO: add status message */
      return;
    }

    const ids = Object.values(items).filter((item) => item.isSelected).map(({ id }) => id);
    const result = await chatsServ.addUsersToChat(ids);

    if (!result) {
      /* TODO: add status message */
      return;
    }

    this.reset();
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

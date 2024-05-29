import { Button, Text } from 'ui';
import { Component } from 'core';

import { FormSearch, ListUsers } from 'features';
import { ItemUserProps } from 'entities/user';

import type { SearchUsersChildren, SearchUsersProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class SearchUsers extends Component<SearchUsersChildren, SearchUsersProps> {
  constructor(props?: SearchUsersProps) {
    super({
      submitHandler: null,
      searchHandler: null,
      hasntUsers: false,
      form: new FormSearch({
        fieldName: 'user-search',
        autofocus: true,
        tabindex: 1,
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          this.handleUsersSearch();
          return event;
        },
      }),
      list: new ListUsers(),
      action: new Button({
        label: 'Submit',
        tabindex: 50,
        disabled: true,
        onClick: () => this.handleSelectedSubmit(),
      }),
      message: new Text({
        text: 'There is no users found, try another request',
        classes: 'search-user__message text_error-color text_label',
      }),
      ...props,
    } as SearchUsersChildren & SearchUsersProps);
  }

  async handleUsersSearch() {
    const { search = '' } = this.children.form.handleSubmit() as { search: string };
    const result = await this.props.searchHandler(search);

    if (!result?.length) {
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

  async handleSelectedSubmit() {
    const { items } = this.children.list.props;
    if (!items || !this.props.submitHandler) {
      /* TODO: add status message */
      return;
    }

    const ids = Object.values(items).filter((item) => item.isSelected).map(({ id }) => id);
    const result = await this.props.submitHandler(ids);

    if (!result) {
      /* TODO: add status message */
      return;
    }

    /* TODO: create result behaviour, now only reset form */
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

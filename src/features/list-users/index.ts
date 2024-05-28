import { Component } from 'core';
import { deepEqual } from 'tools';

import type { ItemUserKeyAttr, ItemUserProps, UserType } from 'entities/user';
import { ItemUser } from 'entities/user';

import type { ItemsUser, ListUsersChildren, ListUsersProps } from './type';
// import { chatsController as control } from './controller';
import './style.css';

// const ListUsersWithState = withStore((state) => ({ chatItems: state.chats }))(Component);

export class ListUsers extends Component<ListUsersChildren, ListUsersProps> {
  constructor(items: ItemsUser = null) {
    super({
      items,
      keys: '',
      hasItems: false,
      hasSelectedItems: false,
      onClick: ({ target }) => {
        if (target instanceof HTMLElement) this.handleSelectItem(target);
      },
    } as ListUsersProps & ListUsersChildren);
  }

  componentDidUpdate(oldProps: ListUsersProps, newProps: ListUsersProps): boolean {
    // eslint-disable-next-line
    const { items: newItems, keys: newKeys, hasItems: newHasItems, ...newRestProps } = newProps;
    const { items: oldItems, keys: oldKeys, hasItems: oldHasItems, ...oldRestProps } = oldProps;
    let newItemsAndKeysProps:Pick<ListUsersProps, 'items' | 'keys' | 'hasItems'> = {
      items: oldItems,
      keys: oldKeys,
      hasItems: oldHasItems,
    };

    /**
     * Here 2 checks:
     * 1. Is chats list has another items. If true => do rerender
     * 2. Is other props changed.
     *
     * This allows you not to recalculate or render the chats if they have not changed.
    */

    const isItemsEqual = deepEqual(oldItems, newItems);
    if (!isItemsEqual && newItems !== null) {
      const newChatComponents = Object
        .entries(newItems)
        .reduce((acc, [key, props]) => ({
          ...acc,
          [key]: new ItemUser({ ...props, isSelected: false }),
        }), {});

      const hasItems = Object.keys(newItems).length > 0;
      const newItemsKeys = Object
        .keys(newItems)
        .map((key) => `{{{${key}}}}`)
        .join(' ')
        .toString();

      newItemsAndKeysProps = { items: newItems, keys: newItemsKeys, hasItems };
      this.children = newChatComponents;
    }

    const isRestPropsEqual = deepEqual(oldRestProps, newRestProps);
    if (!isRestPropsEqual) {
      this.props = { ...newRestProps, ...newItemsAndKeysProps };
    } else {
      this.props = { ...oldRestProps, ...newItemsAndKeysProps };
    }

    return [isItemsEqual, isRestPropsEqual].every(Boolean);
  }

  convertUsersToItem(user: UserType): ItemUserProps {
    return { ...user, isSelected: false };
  }

  handleSelectItem({ attributes }: HTMLElement) {
    if (!('key' in attributes)) return;

    const { key } = attributes as ItemUserKeyAttr;
    const id = Number(key.value);
    this.children[id].toggleSelected();

    // this.setProps({ items: this.props.items[id].toggleSelected() });

    // this.toggleActiveItem(id);
    // control.handleChatSelection(id);
  }

  // toggleActiveItem(id: number) {
  //   if (!id || id === this.props.hasActive) return;
  //   if (this.props.hasActive) {
  //     this.children[this.props.hasActive].toggleActive();
  //   }

  //   this.props.hasActive = id;
  //   this.children[this.props.hasActive].toggleActive();

  //   const { instance, id: index } = this.children[this.props.hasActive];
  //   console.warn(`SELECTED:[${instance}:${index}]`);
  // }

  render() {
    return (
      `<ul class="list-chats">
        {{#if ${this.props.hasItems}}}
          ${this.props.keys}
        {{else}}
          {{#> BaseLayout}}
            <p class="text text_light-color">
              Search users and select some
            </p>
          {{/BaseLayout}}
        {{/if}}
      </ul>`
    );
  }
}

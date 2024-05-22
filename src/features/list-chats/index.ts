import { Component } from 'core';
import { ItemChat } from 'entities/chat';
import { deepEqual } from 'tools';
import { withStore } from 'store';

import type { ItemChatKeyAttr } from 'entities/chat';

import type { ListChatsChildren, ListChatsProps } from './type';
import { chatsController as control } from './controller';
import './style.css';

const ListChatsWithState = withStore((state) => ({ chatItems: state.chats }))(Component);

export class ListChats extends ListChatsWithState<ListChatsChildren, ListChatsProps> {
  constructor() {
    super({
      chatItems: null,
      chatKeys: '',
      hasItems: false,
      hasActive: null,
      onClick: ({ target }) => {
        if (target instanceof HTMLElement) this.handleSelectItem(target);
      },
    } as ListChatsProps & ListChatsChildren);
  }

  init() {
    control.getListChats();
  }

  componentDidUpdate(oldProps: ListChatsProps, newProps: ListChatsProps): boolean {
    const {
      chatItems: newChatItems,
      // eslint-disable-next-line
      chatKeys: newChatKeys,
      // eslint-disable-next-line
      hasItems: newHasItems,
      ...newRestProps
    } = newProps;
    const {
      chatItems: oldChatItems,
      chatKeys: oldChatKeys,
      hasItems: oldHasItems,
      ...oldRestProps
    } = oldProps;
    let newItemsAndKeysProps:Pick<ListChatsProps, 'chatItems' | 'chatKeys' | 'hasItems'> = {
      chatItems: oldChatItems,
      chatKeys: oldChatKeys,
      hasItems: oldHasItems,
    };

    /**
     * Here 2 checks:
     * 1. Is chats list has another items. If true => do rerender
     * 2. Is other props changed.
     *
     * This allows you not to recalculate or render the chats if they have not changed.
    */

    const isChatsEqual = deepEqual(oldChatItems, newChatItems);
    if (!isChatsEqual && newChatItems !== null) {
      const newChatComponents = Object
        .entries(newChatItems)
        .reduce((acc, [key, props]) => ({ ...acc, [key]: new ItemChat(props) }), {});

      const hasItems = Object.keys(newChatItems).length > 0;
      const newKeys = Object
        .keys(newChatItems)
        .map((key) => `{{{${key}}}}`)
        .join(' ')
        .toString();

      newItemsAndKeysProps = { chatItems: newChatItems, chatKeys: newKeys, hasItems };
      this.children = newChatComponents;
    }

    const isRestPropsEqual = deepEqual(oldRestProps, newRestProps);
    if (!isRestPropsEqual) {
      this.props = { ...newRestProps, ...newItemsAndKeysProps };
    } else {
      this.props = { ...oldRestProps, ...newItemsAndKeysProps };
    }

    return [isChatsEqual, isRestPropsEqual].every(Boolean);
  }

  handleSelectItem({ attributes }: HTMLElement) {
    if (!('key' in attributes)) return;

    const { key } = attributes as ItemChatKeyAttr;
    const id = Number(key.value);
    // this.toggleActiveItem(id);

    control.handleChatSelection(id);
  }

  toggleActiveItem(id: number) {
    if (!id || id === this.props.hasActive) return;
    if (this.props.hasActive) {
      this.children[this.props.hasActive].toggleActive();
    }

    this.props.hasActive = id;
    this.children[this.props.hasActive].toggleActive();

    const { instance, id: index } = this.children[this.props.hasActive];
    console.warn(`SELECTED:[${instance}:${index}]`);
  }

  render() {
    return (
      `<ul class="list-chats">
        {{#if ${this.props.hasItems}}}
          ${this.props.chatKeys}
        {{else}}
          {{#> BaseLayout}}
            <p class="text text_light-color list-chats__message">
              There is no any chats
            </p>
          {{/BaseLayout}}
        {{/if}}
      </ul>`
    );
  }
}

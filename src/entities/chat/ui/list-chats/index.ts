import { Component } from 'core';
import { deepEqual } from 'tools';
import { withStore } from 'store';

import { ItemChat, chatsController } from 'entities/chat';

import type { ItemChatKeyAttr } from 'entities/chat';

import type { ListChatsChildren, ListChatsProps } from './type';
import './style.css';

const controller = chatsController;
const ListChatsWithState = withStore((state) => ({ chatItems: state.chats }))(Component);

export class ListChats extends ListChatsWithState<ListChatsChildren, ListChatsProps> {
  constructor() {
    super({
      chatItems: [],
      chatKeys: '',
      hasItems: false,
      hasActive: null,
      onClick: (event) => {
        this.handleSelectItem(event.target as HTMLElement);
        return event;
      },
    } as ListChatsProps & ListChatsChildren);
  }

  init() {
    controller.getListChats();
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
    if (!isChatsEqual) {
      const newChatComponents = newChatItems.reduce((acc, chatData) => {
        const chatItem = new ItemChat(chatData);
        return { ...acc, [chatItem.id.toString()]: chatItem };
      }, {});

      const hasItems = Boolean(newChatItems.length);
      const newKeys = Object.keys(newChatComponents)
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
    this.toggleActiveItem(id);
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

import { Component } from 'core';
import { ItemChat } from 'entities/chat';

import type { ChatType, ItemChatKeyAttr } from 'entities/chat';

import type { ListChatsChildren, ListChatsProps } from './type';
import './style.css';

export class ListChats extends Component<ListChatsChildren, ListChatsProps> {
  constructor({ chats, onClick }: Pick<ListChatsProps, 'onClick'> & { chats: Array<ChatType> }) {
    const items = chats.reduce((acc, chatData) => {
      const chatItem = new ItemChat(chatData);
      return { ...acc, [chatItem.id.toString()]: chatItem };
    }, {});

    const itemKeys = Object.keys(items)
      .map((key) => `{{{${key}}}}`)
      .join(' ')
      .toString();

    super({
      ...items,
      itemKeys,
      active: null,
      onClick: (event) => {
        this.handleSelectItem(event.target as HTMLElement);
        if (onClick) onClick(event);
        return event;
      },
    } as ListChatsProps & ListChatsChildren);
  }

  handleSelectItem({ attributes }: HTMLElement) {
    if (!('key' in attributes)) return;

    const { key } = attributes as ItemChatKeyAttr;
    const id = Number(key.value);
    this.toggleActiveItem(id);
  }

  toggleActiveItem(id: number) {
    if (!id || id === this.props.active) return;
    if (this.props.active) {
      this.children[this.props.active].toggleActive();
    }

    this.props.active = id;
    this.children[this.props.active].toggleActive();

    const { instance, id: index } = this.children[this.props.active];
    console.warn(`SELECTED:[${instance}:${index}]`);
  }

  render() {
    return `<ul class="list-chats">${this.props.itemKeys}</ul>`;
  }
}

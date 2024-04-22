import { Component } from 'core';

import type { ChatType } from 'entities/chat';
import { ItemChat } from 'entities/chat';

import type { ListChatsChildren, ListChatsProps } from './type';
import './style.css';

export class ListChats extends Component<ListChatsChildren, ListChatsProps> {
  constructor(chats: ChatType[]) {
    const items = chats.reduce((acc, chatData) => {
      const chatItem = new ItemChat(chatData);
      return { ...acc, [chatItem.id]: chatItem };
    }, {});

    const itemKeys = Object.keys(items)
      .map((key) => `{{{${key}}}}`)
      .join(' ')
      .toString();

    super({
      ...items,
      itemKeys,
    } as ListChatsProps);
  }

  render() {
    return `<ul class="list-chats">${this.props.itemKeys}</ul>`;
  }
}

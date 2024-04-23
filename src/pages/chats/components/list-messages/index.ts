import { Component } from 'core';
import { ItemChat } from 'entities/chat';

import type { ChatType, ItemChatKeyAttr } from 'entities/chat';

import type { ListMessagesChildren, ListMessagesProps } from './type';
import './style.css';

export class ListMessages extends Component<ListMessagesChildren, ListMessagesProps> {
  constructor(chats: ChatType[]) {
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
        this.handleSelect(event.target as HTMLElement);
        return event;
      },
    } as ListMessagesProps & ListMessagesChildren);
  }

  handleSelect({ attributes }: HTMLElement) {
    if (!('key' in attributes)) return;

    const { key } = attributes as ItemChatKeyAttr;
    const id = key.value;

    if (!id || id === this.props.active) return;
    if (this.props.active) {
      this.children[this.props.active].toggleActive();
    }

    this.props.active = id;
    this.children[this.props.active!].toggleActive();

    const { instance, id: index } = this.children[this.props.active!];
    console.warn(`SELECTED:[${instance}:${index}]`);
  }

  render() {
    return `<ul class="list-messages">${this.props.itemKeys}</ul>`;
  }
}

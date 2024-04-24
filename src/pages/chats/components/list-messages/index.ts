import { Component } from 'core';
import { ItemMessage } from 'entities/message';

import type { MessageType } from 'entities/message';

import type { ListMessagesChildren, ListMessagesProps } from './type';
import './style.css';

export class ListMessages extends Component<ListMessagesChildren, ListMessagesProps> {
  constructor(data: MessageType[]) {
    const items = data.reduce((acc, dataItem) => {
      const listItem = new ItemMessage(dataItem);
      return { ...acc, [listItem.id.toString()]: listItem };
    }, {});

    const itemKeys = Object.keys(items)
      .map((key) => `{{{${key}}}}`)
      .join(' ')
      .toString();

    super({
      ...items,
      itemKeys,
    } as ListMessagesProps & ListMessagesChildren);
  }

  render() {
    return `<ul class="list-messages">${this.props.itemKeys}</ul>`;
  }
}

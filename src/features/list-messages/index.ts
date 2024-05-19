import { Component } from 'core';
import { deepEqual } from 'tools';

import { ItemMessage } from 'entities/message';

import type { ListMessagesChildren, ListMessagesProps } from './type';
import './style.css';

export class ListMessages extends Component<ListMessagesChildren, ListMessagesProps> {
  constructor() {
    super({
      items: [],
      keys: '',
      hasItems: false,
    } as ListMessagesProps & ListMessagesChildren);
  }

  init() {
    // control.getListMessages();
  }

  componentDidUpdate(oldProps: ListMessagesProps, newProps: ListMessagesProps): boolean {
    const {
      items: newItems,
      // eslint-disable-next-line
      keys: newKeys,
      // eslint-disable-next-line
      hasItems: newHasItems,
      ...newRestProps
    } = newProps;
    const {
      items: oldItems,
      keys: oldKeys,
      hasItems: oldHasItems,
      ...oldRestProps
    } = oldProps;
    let newItemsAndKeysProps:Pick<ListMessagesProps, 'items' | 'keys' | 'hasItems'> = {
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
    if (!isItemsEqual) {
      const newComponents = newItems.reduce((acc, props) => {
        const item = new ItemMessage(props);
        return { ...acc, [item.id.toString()]: item };
      }, {});

      const hasItems = Boolean(newItems.length);
      const newItemKeys = Object.keys(newComponents)
        .map((key) => `{{{${key}}}}`)
        .join(' ')
        .toString();

      newItemsAndKeysProps = { items: newItems, keys: newItemKeys, hasItems };
      this.children = newComponents;
    }

    const isRestPropsEqual = deepEqual(oldRestProps, newRestProps);
    if (!isRestPropsEqual) {
      this.props = { ...newRestProps, ...newItemsAndKeysProps };
    } else {
      this.props = { ...oldRestProps, ...newItemsAndKeysProps };
    }

    return [isItemsEqual, isRestPropsEqual].every(Boolean);
  }

  render() {
    return `<ul class="list-messages">${this.props.keys}</ul>`;
  }
}

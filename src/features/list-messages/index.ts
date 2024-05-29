import { Component } from 'core';
import { deepEqual } from 'tools';
import { withStore } from 'store';

import { ItemMessage } from 'entities/message';

import { mssgServ } from 'services/mssg';

import type { ListMessagesChildren, ListMessagesProps } from './type';
import './style.css';

const ListMessagesWithState = withStore((state) => ({ items: state.messages }))(Component);

export class ListMessages extends ListMessagesWithState<ListMessagesChildren, ListMessagesProps> {
  constructor() {
    super({
      items: [],
      keys: '',
      hasItems: false,
    } as ListMessagesProps & ListMessagesChildren);
  }

  init() {
    mssgServ.init();
  }

  componentDidUpdate(oldProps: ListMessagesProps, newProps: ListMessagesProps): boolean {
    // eslint-disable-next-line
    const { items: newItems, keys: newKeys, hasItems: newHasItems, ...newRestProps } = newProps;
    const { items: oldItems, keys: oldKeys, hasItems: oldHasItems, ...oldRestProps } = oldProps;

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
    return (
      `<ul class="list-messages">
        {{#if ${this.props.items.length}}}
          ${this.props.keys}
        {{else}}
          {{#> BaseLayout}}
            <p class="text text_light-color">
              There is no any messages. You can type first!
            </p>
          {{/BaseLayout}}
        {{/if}}
      </ul>`
    );
  }
}

import { Component } from 'core';
import { deepEqual } from 'tools';
import { withStore } from 'store';

import { ItemMessage } from 'entities/message';

import { mssgServ } from 'services/mssg';

import type { ListMessagesChildren, ListMessagesProps } from './type';
import './style.css';

const ListMessagesWithState = withStore((state) => ({ items: state.messages }))(Component);

export class ListMessages extends ListMessagesWithState<ListMessagesChildren, ListMessagesProps> {
  private ableToLoad = true;
  private scrollTop = 0;

  constructor() {
    super({
      items: [],
      keys: '',
      hasItems: false,
      onScroll: () => this.loadOldestMssgsHandler(),
    } as ListMessagesProps & ListMessagesChildren);
  }

  async init() {
    await mssgServ.init();
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
      const newComponents = newItems.reduceRight((acc, props) => {
        const item = new ItemMessage(props);
        return { ...acc, [item.id.toString()]: item };
      }, {});

      const hasItems = Boolean(newItems.length);
      const newItemKeys = Object.values(newItems).reverse()
        .map(({ id }) => `{{{${id}}}}`)
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

    window.setTimeout(this.handleOnLoad.bind(this), 0);
    return [isItemsEqual, isRestPropsEqual].every(Boolean);
  }

  handleOnLoad() {
    if (this.element === null) return;
    this.element.scrollTop = this.scrollTop;
    this.ableToLoad = true;
    this.scrollTop = 0;
  }

  loadOldestMssgsHandler() {
    if (!this.element) return;
    const { offsetHeight, offsetTop, scrollTop, scrollHeight } = this.element;
    const border = 40;
    const height = scrollHeight - offsetHeight - offsetTop;
    const trigger = (height + scrollTop) < border;

    if (trigger && this.ableToLoad) {
      this.scrollTop = scrollTop;
      this.ableToLoad = false;
      mssgServ.getPreviosMssg(20);
    }
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

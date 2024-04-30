import { Component } from 'core';
import { MenuItem } from '../menu-item';

import type { MenuChildren, MenuProps } from './type';
import './style.css';

export class Menu extends Component<MenuChildren, MenuProps> {
  constructor({ itemsProps, ...rest }: Pick<MenuProps, 'itemsProps' | 'position'>) {
    const menuItems = itemsProps.reduce((acc, props) => {
      const item = new MenuItem({ ...props });
      return { ...acc, [item.id as string]: item };
    }, {});

    const keys = Object.keys(menuItems)
      .map((key) => `{{{${key}}}}`)
      .join(' ')
      .toString();

    super({
      keys,
      visible: false,
      onClick: () => { this.hideMenu(); },
      ...menuItems,
      ...rest,
    } as MenuChildren & MenuProps);
  }

  showMenu() {
    this.setProps({ visible: true });
  }

  hideMenu() {
    this.setProps({ visible: false });
  }

  render() {
    const { visible, position, keys } = this.props;
    return (
      `<div
        class="menu-container ${visible ? 'menu-container_visible' : ''}"
      >
        <ul
          class="surface menu"
          style="
            top: ${position.top}em;
            right: ${position.right}em;
            bottom: ${position.bottom}em;
            left: ${position.left}em;
          "
        >
          ${keys}
        </ul>
      </div>`
    );
  }
}

export { MenuChildren, MenuProps };

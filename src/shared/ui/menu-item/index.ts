import { Component } from 'core';
import { Text } from '../text';

import type { MenuItemChildren, MenuItemProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class MenuItem extends Component<MenuItemChildren, MenuItemProps> {
  constructor({ label, ...rest }: MenuItemProps) {
    super({
      text: new Text({ text: label, classes: 'menu-item__label' }),
      ...rest,
    } as MenuItemChildren & MenuItemProps);
  }

  render() {
    return template;
  }
}

export type { MenuItemChildren, MenuItemProps };

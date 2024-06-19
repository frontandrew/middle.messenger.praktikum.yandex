import { expect, describe, test, beforeAll, vi } from 'vitest';
import { Component } from 'core';

import type { Children, Props } from 'core';

const temlate = '<span class="stub">{{content}}</span>';

interface StubProps extends Props {
  content?: string;
}

class ComptStub extends Component<Children, StubProps> {
  constructor(props?: StubProps) {
    super({ content: props?.content ?? 'stub content' } as StubProps & Children);
  }

  public render() {
    return temlate;
  }
}

const spies = {
  render: vi.spyOn(ComptStub.prototype, 'render'),

  init: vi.spyOn(Component.prototype, 'init'),
  setProps: vi.spyOn(Component.prototype, 'setProps'),
  update: vi.spyOn(Component.prototype, 'componentDidUpdate'),
  mount: vi.spyOn(Component.prototype, 'componentDidMount'),
  show: vi.spyOn(Component.prototype, 'show'),
  hide: vi.spyOn(Component.prototype, 'hide'),
};

const compStub = new ComptStub();

describe('Instance of Component', () => {
  describe(`on instance initialization`, () => {
    test('should call "init()" method once', () => {
      expect(spies.init).toBeCalledTimes(1);
    });
    test('should call "componentDidMount()" method once', () => {
      expect(spies.mount).toBeCalledTimes(1);
    });
    test('should not call "componentDidUpdate()" method', () => {
      expect(spies.update).toBeCalledTimes(0);
    });
    test('should not call "componentDidUpdate()" method', () => {
      expect(spies.update).toBeCalledTimes(0);
    });
    test(`should not call "setProps()" methode`, () => {
      expect(spies.setProps).toBeCalledTimes(0);
    });

    test('should call "render()" method once', () => {
      expect(spies.render).toBeCalledTimes(1);
    });
    test('should create HTMLElement', () => {
      expect(compStub.getContent()).toBeInstanceOf(HTMLElement);
    });
  });

  describe(`on instance property update`, () => {
    const newProps = { content: 'new content' };
    beforeAll(() => {
      compStub.setProps(newProps);
    });

    test(`should call "setProps()" methode once`, () => {
      expect(spies.setProps).toBeCalledTimes(1);
    });
    test(`should call "componentDidUpdate()" method`, () => {
      expect(spies.update).toBeCalledTimes(1);
    });
    test(`props should be equal passed propetries`, () => {
      expect(compStub.props).toEqual(newProps);
    });
    test(`element content should be equal passed propetries`, () => {
      expect(compStub.getContent()?.textContent).toEqual(newProps.content);
    });
  });

  describe(`on instance call "hide()" method`, () => {
    beforeAll(() => {
      compStub.hide();
    });

    test(`this method should be called only once`, () => {
      expect(spies.hide).toBeCalledTimes(1);
    });
  });

  describe(`on instance call "show()" method`, () => {
    beforeAll(() => {
      compStub.show();
    });

    test(`this method should be called only once`, () => {
      expect(spies.show).toBeCalledTimes(1);
    });
  });
});

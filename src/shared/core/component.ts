import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import { EventBus } from './event-bus';
import { createProxy } from './proxy-object';
import { deepEqual } from 'tools';

export class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  id = nanoid(6);

  _meta = null;

  _element = null;

  constructor(args = {}) {
    const eventBus = new EventBus();
    this.count = 0; // temporary

    const { props, children, events } = this._separatePropsWithCildren(args);

    this._meta = { props, children, events };
    this.children = this._makePropsProxy(children);
    this.props = this._makePropsProxy(props);
    this.events = this._makePropsProxy(events);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  _separatePropsWithCildren(args) {
    const props = {};
    const children = {};
    const events = {};

    Object.entries(args).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
        return;
      }
      if (key.startsWith('on')) {
        events[key] = value;
      } else props[key] = value;
    });

    return { props, children, events };
  }

  _registerEvents(eventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {
    this.instance = this.__proto__.constructor.name;
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  _render() {
    const element = this.createDOMElement();

    Object.values(this.children).forEach((child) => {
      const stub = element.querySelector(`[data-id='${child.id}']`);
      stub?.replaceWith(child.getContent());
    });

    if (this._element) this._element.replaceWith(element);
    this._element = element;

    this._attachEvents();
    console.log(
      `RNDR[${`${this.instance}:${this.id}`}]::${++this.count}`,
      this,
    );
  }

  render() { }

  createDOMElement() {
    const stubs = Object.entries(this.children).reduce(
      (acc, [key, child]) => ({
        ...acc,
        [key]: `<div data-id='${child.id}'></div>`,
      }),
      {},
    );

    const elementString = Handlebars.compile(this.render().trim())({
      ...this.props,
      ...stubs,
    });

    const tempElement = document.createElement('div');
    tempElement.insertAdjacentHTML('afterbegin', elementString.trim());

    const resultElement = tempElement.firstElementChild;
    resultElement.setAttribute('data-id', this.id);

    return resultElement;
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) { }

  dispatchComponentDidMount() {
    this._eventBus().emit(Component.EVENTS.FLOW_CDM);
    console.log(`dispatch:CDM[${this.id}]`);
  }

  _componentDidUpdate(oldProps, newProps) {
    // console.log(`_CDU[${this._element?.nodeName + '::' + this.id}]::${this.count}`, { ...this._meta, elem: this._element })
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._detachEvents();
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
      return true;
    }

    return false;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps(nextProps) {
    if (!nextProps || !Object.keys(nextProps)?.length) {
      console.warn(`Properties not passed.`);
      return;
    }

    /**
     *  TODO: попытка сравнивать пропсы, чтоб принять решение, ножно ли их обновлять.
     *  Иногда кажется, что работает не корректно, нужно
     */
    const expectedProps = { ...this.props, ...nextProps };
    const isEqual = deepEqual(this.props, expectedProps);
    // console.log(`set::equality:`, { curr: this.props, expc: expectedProps })
    if (isEqual) {
      console.warn(`Properties arent changed.`, {
        curr: this.props,
        next: expectedProps,
      });
      return;
    }

    Object.entries(nextProps).forEach(([key, value]) => {
      // console.log(`set[${key}]:${this.props[key]} > ${value}`)
      this.props[key] = value;
    });

    this.eventBus().emit(Component.EVENTS.FLOW_CDU, nextProps, this.props);
  }

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    return createProxy(props);
  }

  _attachEvents() {
    if (Object.keys(this.events).length <= 0) return;

    for (const [key, value] of Object.entries(this.events)) {
      this._element.addEventListener(key.toLowerCase().slice(2), value);
    }
  }

  _detachEvents() {
    if (Object.keys(this.events).length <= 0) return;

    for (const [key, value] of Object.entries(this.events)) {
      this._element.removeEventListener(key.toLowerCase().slice(2), value);
    }
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  getPropsChildren() {
    return Object.entries(this.children).reduce(
      (acc, [key, child]) => ({ ...acc, [key]: child.props }),
      {},
    );
  }
}

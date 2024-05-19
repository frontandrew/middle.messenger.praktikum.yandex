import Handlebars from 'handlebars';
import { customAlphabet } from 'nanoid';

import { deepCopy, deepEqual } from 'tools';

import { EventBus } from './event-bus';
import { createProxy } from './proxy-object';

const nanoid = customAlphabet('0123456789abcdefghjkmnpqrstuvwxyz');

export type DOMEvent = (({}: Event) => Event) | (() => void);
export type Events = { [key: string]: DOMEvent };

export type Child = InstanceType<typeof Component>;
export type Children = { [key: string]: Child };

export type Prop = unknown;
export type Props = { [key: string]: Prop };

export class Component <C extends Children, P extends Props> {
  static EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    INIT: 'init',
  };

  public id;
  public instance;
  public props;
  public children;
  public events;

  protected parentNode: Node | null = null;
  protected _element: HTMLElement | null = null;
  protected count;

  private meta: Nullable<UnknownObject> = null;

  private eventBus: () => EventBus;

  constructor(args: C & P) {
    const eventBus = new EventBus();

    const { children, events, props } = this.separateArguments(args);

    this.children = this.makePropsProxy(children) as C;
    this.props = this.makePropsProxy(props) as P;
    this.events = this.makePropsProxy(events) as Events;

    this.id = props.id || nanoid(6);
    this.count = 0;
    this.instance = 'Component';
    this.meta = { children, events, props };
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private separateArguments(args: P & C) {
    const props: UnknownObject = {};
    const children: UnknownObject = {};
    const events: UnknownObject = {};

    Object.entries(args).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
        return;
      }
      if (key.startsWith('on')) {
        events[key] = value;
      } else props[key] = value;
    });

    return { children, events, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _init() {
    this.instance = Object.getPrototypeOf(this).constructor.name;
    this.init();
    // this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    this.dispatchComponentDidMount();
  }

  init() {}

  _render() {
    const element = this.createDOMElement();

    Object.values(this.children).forEach((child) => {
      const stub = element!.querySelector(`[data-id='${child.id}']`);
      stub?.replaceWith(child.getContent()!);
    });

    if (this._element) this._element.replaceWith(element as Node);
    this._element = element as HTMLElement;

    this._attachEvents();

    this.count += 1;
    this.meta = {
      props: { ...this.props },
      children: { ...this.children },
      events: { ...this.events },
      count: this.count,
    };
    console.warn(`RNDR{${this.count}}:[${`${this.instance}:${this.id}`}]:`, this.meta);
  }

  render() {
    return '';
  }

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

    return resultElement;
  }

  _componentDidMount(props: P) {
    // console.warn(`CDM{${this.count}}:[${`${this.instance}:${this.id}`}]:`, this.meta);
    if (this.componentDidMount(props)) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(props: P) {
    if (props) return true;
    return true;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    // console.log(`dispatch:CDM[${this.id}]`);
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const isEqual = this.componentDidUpdate(oldProps, newProps);

    if (!isEqual) {
      this._detachEvents();
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
      return true;
    }

    return false;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: P, newProps: P) {
    const isEqual = deepEqual(newProps, oldProps);
    // console.warn(`EQUA{${this.count}}:[${this.instance}:${this.id}]:`, {
    //   eql: isEqual,
    //   new: newProps,
    //   old: oldProps,
    // });
    return isEqual;
  }

  public setProps(nextProps: { [K in keyof P]?: P[K] }) {
    if (!nextProps || !Object.keys(nextProps)?.length) {
      console.warn(`Properties not passed.`, nextProps);
      return;
    }

    const oldProps = deepCopy(this.props);

    Object.entries(nextProps).forEach(([key, value]) => {
      this.props = { ...this.props, [key]: value };
    });

    this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, this.props);
  }

  get element() {
    return this._element;
  }

  public getContent() {
    return this.element;
  }

  private makePropsProxy(args: UnknownObject) {
    return createProxy(args);
  }

  _attachEvents() {
    if (Object.keys(this.events).length <= 0) return;

    Object.entries(this.events).forEach(([key, value]) => {
      this._element!.addEventListener(key.toLowerCase().slice(2), value);
    });
  }

  _detachEvents() {
    if (Object.keys(this.events).length <= 0) return;

    Object.entries(this.events).forEach(([key, value]) => {
      this._element!.addEventListener(key.toLowerCase().slice(2), value);
    });
  }

  show() {
    if (this.parentNode) {
      this.parentNode.appendChild(this.getContent() as Node);
    }
    console.warn(
      `SHOW{${this.count}}:[${this.instance}:${this.id}]:`,
      { ...this.meta, elem: this._element },
    );
  }

  hide() {
    this.parentNode = this._element?.parentNode as Node;
    this._element?.remove();
    console.warn(
      `HIDE{${this.count}}:[${this.instance}:${this.id}]:`,
      { ...this.meta, elem: this._element },
    );
  }
}

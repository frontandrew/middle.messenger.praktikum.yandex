import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import { deepEqual } from 'tools';

import { EventBus } from './event-bus';
import { createProxy } from './proxy-object';

// eslint-disable-next-line no-use-before-define
export type Children = Record<string, Component>
export type Events = Record<string, ({}: Event) => Event>

export class Component<Props> {
  static EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    INIT: 'init',
  };

  public id;
  public instance;
  public props: Props;
  public children: Children;
  public events: Events;

  protected _element: HTMLElement | null = null;
  protected count;

  readonly meta: any = null;

  private eventBus: () => EventBus;

  constructor(args: Record<string, unknown>) {
    const eventBus = new EventBus();

    const { children, events, props } = this.separateArguments(args);

    this.id = nanoid(6);
    this.count = 0;
    this.instance = 'Component';
    this.meta = { children, events, props };
    this.children = this._makePropsProxy(children);
    this.props = this._makePropsProxy(props);
    this.events = this._makePropsProxy(events);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private separateArguments(args: Record<string, unknown>) {
    const props: Record<string, unknown> = {};
    const children: Record<string, unknown> = {};
    const events: Record<string, unknown> = {};

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
      const stub = element!.querySelector(`[data-id='${child.id}']`);
      stub?.replaceWith(child.getContent() as HTMLElement);
    });

    if (this._element) this._element.replaceWith(element as Node);
    this._element = element as HTMLElement;

    this._attachEvents();
    console.warn(
      `RNDR[${`${this.instance}:${this.id}`}]::${++this.count}`,
      this,
    );
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
    resultElement!.setAttribute('data-id', this.id);

    return resultElement;
  }

  _componentDidMount(props: Props) {
    this.componentDidMount(props);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(props: Props) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    // console.log(`dispatch:CDM[${this.id}]`);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    // console.log(
    //   `_CDU[${this._element?.nodeName + '::' + this.id}]::${this.count}`,
    //   { ...this.meta, elem: this._element }
    // )
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._detachEvents();
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
      return true;
    }

    return false;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  setProps<T>(nextProps: T) {
    if (!nextProps || !Object.keys(nextProps)?.length) {
      console.warn(`Properties not passed.`, nextProps);
      return;
    }

    /**
     * TODO: попытка сравнивать пропсы, чтоб принять решение,
     * ножно ли их обновлять. Иногда кажется, что работает не корректно.
     */
    const expectedProps = { ...this.props, ...nextProps };
    const isEqual = deepEqual(this.props, expectedProps);
    if (isEqual) {
      console.warn(`Properties arent changed.`, {
        curr: this.props,
        next: expectedProps,
      });
      return;
    }

    Object.entries(nextProps).forEach(([key, value]) => {
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

  _makePropsProxy(args) {
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
    (this.getContent() as HTMLElement).style.display = 'block';
  }

  hide() {
    (this.getContent() as HTMLElement).style.display = 'none';
  }

  getPropsChildren() {
    return Object.entries(this.children).reduce(
      (acc, [key, child]) => ({ ...acc, [key]: child.props }),
      {},
    );
  }
}

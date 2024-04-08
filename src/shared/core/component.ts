import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import { deepCopy, deepEqual } from 'tools';

import { EventBus } from './event-bus';
import { createProxy } from './proxy-object';

type Events = Record<string, ({}: Event) => Event>

export class Component <Args, Children, Props> {
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

  protected _element: HTMLElement | null = null;
  protected count;

  private meta: Nullable<UnknownObject> = null;

  private eventBus: () => EventBus;

  constructor(args: Args) {
    const eventBus = new EventBus();

    const { children, events, props } = this.separateArguments(args);

    this.id = nanoid(6);
    this.count = 0;
    this.instance = 'Component';
    this.meta = { children, events, props };
    this.children = this.makePropsProxy(children) as Children;
    this.props = this.makePropsProxy(props) as Props;
    this.events = this.makePropsProxy(events) as Events;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private separateArguments(args: Args) {
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
    this.createChildren();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  init() {}

  createChildren() {}

  _render() {
    const element = this.createDOMElement();

    Object.values(this.children).forEach((child) => {
      const stub = element!.querySelector(`[data-id='${child.id}']`);
      stub?.replaceWith(child.getContent() as HTMLElement);
    });

    if (this._element) this._element.replaceWith(element as Node);
    this._element = element as HTMLElement;

    this._attachEvents();
    // eslint-disable-next-line no-plusplus
    console.warn(`RNDR{${++this.count}}:[${`${this.instance}:${this.id}`}]:`, this.meta);
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

  // Может переопределять пользователь, необязательно трогать. Не используется
  componentDidMount(props: Props) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    // console.log(`dispatch:CDM[${this.id}]`);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const isEqual = this.componentDidUpdate(oldProps, newProps);

    if (!isEqual) {
      this._detachEvents();
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
      return true;
    }

    return false;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: Props, newProps: Props) {
    const isEqual = deepEqual(newProps, oldProps);
    console.warn(`EQUA{${this.count}}:[${this.instance}:${this.id}]:`, {
      eql: isEqual,
      new: newProps,
      old: oldProps,
    });
    return isEqual;
  }

  setProps(nextProps: { [Prop in keyof Props]?: Props[Prop] }) {
    if (!nextProps || !Object.keys(nextProps)?.length) {
      console.warn(`Properties not passed.`, nextProps);
      return;
    }

    const oldProps = deepCopy(this.props);

    /**
     * TODO: попытка сравнивать пропсы, чтоб принять решение,
     * ножно ли их обновлять. Иногда кажется, что работает не корректно.
     */
    // const expectedProps = { ...this.props, ...nextProps };
    // const isEqual = deepEqual(this.props, expectedProps);
    // if (isEqual) {
    //   // console.warn(`Properties arent changed.`, {
    //   //   curr: this.meta.props,
    //   //   next: expectedProps,
    //   // });
    //   return;
    // }

    Object.entries(nextProps).forEach(([key, value]) => {
      this.props = { ...this.props, [key]: value };
    });

    this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, this.props);
  }

  get element() {
    return this._element;
  }

  getContent() {
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

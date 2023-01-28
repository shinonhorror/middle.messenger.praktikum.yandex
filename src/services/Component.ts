import { v4 as uuidv4 } from 'uuid';
import * as Handlebars from 'handlebars';
import EventBus from './EventBus';

type Props<T = { [x: string]: unknown }> = {
  events?: { [x: string]: (e: InputEvent | SubmitEvent) => void };
} & T;

export default class Component<T = { [x: string]: unknown }> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _props: Props<T>;

  _children: Record<string, Component>;

  _id: string;

  _eventBus: EventBus;

  _element: HTMLElement;

  _meta: {
    tagName: string;
    props: Props<T>;
  };

  _setUpdate: boolean = false;

  propsAndChilds: Props<T>;

  constructor(tagName = 'div', propsAndChilds: Props<T> = {} as Props<T>) {
    const { children, props } = this.getChildren(propsAndChilds);
    this._eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
    this._id = uuidv4();
    this._children = children;
    this._props = this._makePropsProxy(props);

    this._registerEvents();
    this._eventBus.emit(Component.EVENTS.INIT);
  }

  private _registerEvents() {
    this._eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(
      Component.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this),
    );
    this._eventBus.on(
      Component.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    );
    this._eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this.createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
    this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount(): void {
    this._eventBus.emit(Component.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) {
      this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.keys(this._children).forEach((child: any) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(): void {}

  componentDidUpdate(oldProps: Props<T>, newProps: Props<T>): boolean {
    if (oldProps === newProps) {
      return false;
    }
    return true;
  }

  private _componentDidUpdate(oldProps: Props<T>, newProps: Props<T>): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  public setProps = (newProps: Props<T>): void => {
    if (!newProps) {
      return;
    }
    const oldValue = { ...this._props };
    const { children, props } = this.getChildren(newProps);
    if (Object.keys(children).length) {
      Object.assign(this._children, children);
    }
    if (Object.keys(props).length) {
      Object.assign(this._props, props);
    }
    if (this._setUpdate) {
      this._eventBus.emit(Component.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  };

  private _makePropsProxy(props: Props<T>) {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop as keyof Props<T>];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, val) => {
        if (target[prop as keyof Props<T>] !== val) {
          target[prop as keyof Props<T>] = val;
          this._setUpdate = true;
        }
        return true;
      },
    });
  }

  get element() {
    return this._element;
  }

  private _render(): void {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this.addEvents();
  }

  render(): any {}

  addEvents(): void {
    const { events }: { [key: string]: any } = this._props;
    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      const listener = events[eventName];
      if (Array.isArray(listener)) {
        listener.forEach((fun) => {
          this._element.addEventListener(eventName, fun);
        });
      } else {
        this._element.addEventListener(eventName, listener);
      }
    });
  }

  removeEvents(): void {
    const { events }: { [key: string]: any } = this._props;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      const listener = events[eventName];
      if (Array.isArray(listener)) {
        listener.forEach((fun) => {
          this._element.removeEventListener(eventName, fun);
        });
      } else {
        this._element.removeEventListener(eventName, listener);
      }
    });
  }

  compile(template: string, props: any = this._props): DocumentFragment {
    const propsAnsStubs = { ...props };
    (<any>Object)
      .entries(this._children as Record<string, Component>)
      .forEach(([key, child]: any) => {
        propsAnsStubs[key] = `<div data-id="${child._id}"></div>`;
      });
    const fragment = this.createDocumentElement(
      'template',
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAnsStubs);
    (<any>Object)
      .values(this._children)
      .forEach((child: InstanceType<typeof Component>) => {
        const stub = fragment.content.querySelector(`[data-id='${child._id}']`);
        if (stub) {
          stub.replaceWith(child.getContent());
        }
      });
    return fragment.content;
  }

  getChildren(propsAndChilds: Props<T>): {
    props: Props<T>;
    children: Record<string, Component>;
  } {
    const children: Record<string, Component> = {};
    const props:Record<string, unknown> = {};

    (<any>Object).entries(propsAndChilds).forEach(([key, value]: any) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props: props as Props<T> };
  }

  public getContent() {
    return this.element;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

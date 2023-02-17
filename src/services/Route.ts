import render from '~src/utils/pagesRender';
import Component from './Component';
import { isEqual } from '~src/utils/isEqual';

export default class Route {
  _pathname: string;

  _block: Component | null;

  _props: { [key: string]: string };

  _blockClass: any;

  constructor(pathname: string, view: any, props: { [key: string]: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    this._block = null;
  }

  match(pathname: string) {
    return isEqual(pathname as any, this._pathname as any);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      render(this._props.rootQuery, this._block as Component);
    }
  }
}

import tpl from './link';

import Component from '../../services/Component';

type LinkButtonType = {
  buttonClass?: string;
  linkClass: string;
  title: string;
  link?: string;
  events?: { click: (e: Event) => void };
};
export default class LinkButton extends Component<LinkButtonType> {
  constructor(props:LinkButtonType) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, { ...this._props });
  }
}

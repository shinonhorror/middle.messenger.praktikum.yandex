import tpl from './link';

import Component from '../../services/Component';

type LinkButtonType = {
  data: Array<{ [key: string]: string }>;
};
export default class LinkButton extends Component<LinkButtonType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

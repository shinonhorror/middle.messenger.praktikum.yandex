import tpl from './link';

import Component from '../../services/Component';

export default class LinkButton extends Component {
  render(): string {
    return this.compile(tpl);
  }
}

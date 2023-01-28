import tpl from './nav.ts';

import Component from '../../services/Component';

export default class Nav extends Component {
  render(): string {
    return this.compile(tpl);
  }
}

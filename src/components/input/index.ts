import tpl from './input';

import Component from '../../services/Component';

export default class InputBase extends Component {
  render(): string {
    return this.compile(tpl);
  }
}

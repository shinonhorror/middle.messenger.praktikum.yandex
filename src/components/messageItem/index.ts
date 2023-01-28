import tpl from './message';

import Component from '../../services/Component';

export default class MessageItem extends Component {
  render(): string {
    return this.compile(tpl);
  }
}

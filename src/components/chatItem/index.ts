import tpl from './chatItem';

import Component from '../../services/Component';

export default class ChatItem extends Component {
  render(): string {
    return this.compile(tpl);
  }
}

import tpl from './chatItem';

import Component from '../../services/Component';

type ChatItemType = {
  data: Array<{ [key: string]: string }>;
};
export default class ChatItem extends Component<ChatItemType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

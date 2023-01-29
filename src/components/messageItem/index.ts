import tpl from './message';

import Component from '../../services/Component';

type MessageItemType = {
  data: Array<{ [key:string]:string }>;
};
export default class MessageItem extends Component<MessageItemType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

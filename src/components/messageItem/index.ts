import tpl from './message';
import Component from '../../services/Component';
import { MessageItemType } from '~src/types/ChatTypes';
import connect from '~src/services/Connector';

export class MessageItem extends Component<MessageItemType> {
  constructor(props: MessageItemType) {
    super('div', props);
    this._element.classList.add('chat__window-core');
  }

  render(): DocumentFragment {
    return this.compile(tpl, { ...this._props });
  }
}

const withMessage = connect((state) => ({ mess: [...(state.mess || [])] }));
export const MessageItemClass = withMessage(MessageItem);

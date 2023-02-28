import tpl from './message';
import Component from '@/services/Component';
import { MessageItemType } from '@/types/ChatTypes';
import connect from '@/services/Connector';

export class MessageItem extends Component<MessageItemType> {
  constructor(props: MessageItemType) {
    super('div', props);
    this._element.classList.add('chat__window-core');
  }

  render(): DocumentFragment {
    const wrapper = document.querySelector('.chat__window-core');
    if (wrapper) {
      const element = wrapper.lastElementChild as HTMLElement;
      element.scrollIntoView();
    }
    return this.compile(tpl, { ...this._props });
  }
}

const withMessage = connect((state) => ({ mess: [...(state.mess || [])] }));
export const MessageItemClass = withMessage(MessageItem);

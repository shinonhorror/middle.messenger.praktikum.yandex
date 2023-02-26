import tpl from './index';
import Component from '@/services/Component';

type ModalType = {
  modalClass: string;
  title: string;
  button: string;
  events?: {
    [x: string]: (
      e: InputEvent | SubmitEvent | MouseEvent | Event | void
    ) => void;
  };
};
export default class Modal extends Component<ModalType> {
  constructor(props: ModalType) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

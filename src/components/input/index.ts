import tpl from './input';

import Component from '../../services/Component';

type InputBaseType = {
  data: Array<{ [key: string]: string }>;
};
export default class InputBase extends Component<InputBaseType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

import tpl from './errors';

import Component from '../../services/Component';

type ErrorType = {
  chat: string;
  code:string;
  desc:string;
};
export default class Error extends Component<ErrorType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

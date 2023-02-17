import tpl from './errors';

import Component from '../../services/Component';

type ErrorType = {
  error: boolean;
};
export default class Error extends Component<ErrorType> {
  constructor(type: boolean = true) {
    super('div');
    this.setProps({
      error: type,
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

import tpl from './button';

import Component from '../../services/Component';

type BaseButtonType = {
  buttonClass: string;
  href: string;
  title: string;
};
export default class BaseButton extends Component<BaseButtonType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

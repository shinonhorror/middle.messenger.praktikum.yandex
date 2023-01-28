import tpl from './button';

import Component from '../../services/Component';

export default class BaseButton extends Component {
  render() {
    return this.compile(tpl);
  }
}

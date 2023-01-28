import tpl from './errors';

import Component from '../../services/Component';

export default class Error extends Component {
  render() {
    return this.compile(tpl);
  }
}

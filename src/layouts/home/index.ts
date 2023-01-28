import tpl from './home';

import Component from '../../services/Component';

export default class Home extends Component {
  render() {
    return this.compile(tpl);
  }
}

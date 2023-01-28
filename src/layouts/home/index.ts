import tpl from './home';

import Component from '../../services/Component';

type HomeType = {
  title: string;
  nav: Component;
};
export default class Home extends Component<HomeType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

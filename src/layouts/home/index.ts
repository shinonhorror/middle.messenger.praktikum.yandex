import tpl from './home';

import Component from '../../services/Component';
import Nav from '~src/components/navbar';

type HomeType = {
  title: string;
  nav: Component;
};
export default class Home extends Component<HomeType> {
  constructor() {
    super('div');
    this.setProps({
      title: 'Страницы',
      nav: new Nav(),
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

import tpl from './nav';

import Component from '../../services/Component';

type NavType = {
  login: string;
  auth: string;
  chat: string;
  profile: string;
  error: string;
  notFound: string;
};
export default class Nav extends Component<NavType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

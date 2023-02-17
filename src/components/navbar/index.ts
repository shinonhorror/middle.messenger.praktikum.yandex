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
  constructor() {
    super('nav');
    this.setProps({
      login: '/sign-in',
      auth: '/sign-up',
      chat: '/messenger',
      profile: '/profile',
      error: '/500',
      notFound: '/404',
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl);
  }
}

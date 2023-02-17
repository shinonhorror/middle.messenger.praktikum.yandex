import tpl from './errors';
import Component from '../../services/Component';
import router from '~src/js';

type ErrorType = {
  err?: boolean;
};

export default class Error extends Component<ErrorType> {
  constructor(props: ErrorType) {
    super('div', {
      ...props,
      err: true,
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, { ...this._props });
  }

  addEvents(): void {
    const link = this._element.querySelector('.message__link');
    link?.addEventListener('click', (e) => {
      e.preventDefault();
      router.go('/messenger');
    });
    super.addEvents();
  }

  removeEvents(): void {
    const link = this._element.querySelector('.message__link');
    link?.removeEventListener('click', (e) => {
      e.preventDefault();
      router.go('/messenger');
    });
    super.removeEvents();
  }
}

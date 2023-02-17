import tpl from './login';
import Component from '../../services/Component';
import {
  Blur, Focus, Input, Submit,
} from '~src/data/events';
import BaseButton from '~src/components/baseButton';
import inputDataLogin from '~src/data/login';
import InputBase from '~src/components/input';
import router from '~src/js';

type LoginType = {
  title: string;
  auth: string;
  input: Component;
  button: Component;
};
export default class Login extends Component<LoginType> {
  constructor(props: LoginType) {
    super('div', {
      ...props,
      button: new BaseButton('div', {
        buttonClass: 'button__base',
        title: 'Войти',
      }),
      input: new InputBase({
        data: inputDataLogin.data,
      }),
    });
    this._props.events = {
      submit: Submit,
      focus: Focus,
      blur: Blur,
      input: Input,
    };
  }

  render(): DocumentFragment {
    return this.compile(tpl, { ...this._props });
  }

  addEvents(): void {
    const link = this._element.querySelector('.button__link');
    link?.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      router.go('/sign-up');
    });
    if (!this._props.events) {
      return;
    }
    const {
      focus, blur, input,
    } = this._props.events as {
      [key: string]: () => void;
    };
    this._element.querySelectorAll('input').forEach((a) => {
      a.addEventListener('focus', focus);
      a.addEventListener('blur', blur);
      a.addEventListener('input', input);
    });
    super.addEvents();
  }

  removeEvents(): void {
    const link = this._element.querySelector('.button__link');
    link?.removeEventListener('click', (e: Event): void => {
      e.preventDefault();
      router.go('/sign-up');
    });
    if (!this._props.events) {
      return;
    }
    const {
      focus, blur, input,
    } = this._props.events as {
      [key: string]: () => void;
    };
    this._element.querySelectorAll('input').forEach((a) => {
      a.removeEventListener('focus', focus);
      a.removeEventListener('blur', blur);
      a.removeEventListener('input', input);
    });
    super.removeEvents();
  }
}

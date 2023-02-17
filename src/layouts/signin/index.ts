import tpl from './signin';

import Component from '../../services/Component';
import inputDataSignin from '~src/data/signin';
import {
  Blur, Focus, Input, Submit,
} from '~src/data/events';
import BaseButton from '~src/components/baseButton';
import InputBase from '~src/components/input';
import router from '~src/js';

type SigninType = {
  title: string;
  input: Component;
  button: Component;
};
export default class Signin extends Component<SigninType> {
  constructor(props: SigninType) {
    super('div', {
      ...props,
      title: 'Регистрация',
      input: new InputBase({
        data: inputDataSignin.data,
      }),
      button: new BaseButton('div', {
        buttonClass: 'button__base',
        title: 'Зарегестрироваться',
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
    link?.addEventListener('click', (e) => {
      e.preventDefault();
      router.go('/sign-in');
    });
    if (!this._props.events) {
      return;
    }
    this._element.querySelectorAll('input').forEach((a) => {
      const { focus, blur, input } = this._props.events as {
        [key: string]: () => void;
      };
      a.addEventListener('focus', focus);
      a.addEventListener('blur', blur);
      a.addEventListener('input', input);
    });
    super.addEvents();
  }

  removeEvents(): void {
    const link = this._element.querySelector('.button__link');
    link?.removeEventListener('click', (e) => {
      e.preventDefault();
      router.go('/sign-in');
    });
    if (!this._props.events) {
      return;
    }
    this._element.querySelectorAll('input').forEach((a) => {
      const { focus, blur, input } = this._props.events as {
        [key: string]: () => void;
      };
      a.removeEventListener('focus', focus);
      a.removeEventListener('blur', blur);
      a.removeEventListener('input', input);
    });
    super.removeEvents();
  }
}

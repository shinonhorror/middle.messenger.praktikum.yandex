import tpl from './signin';

import Component from '@/services/Component';
import inputDataSignin from '@/data/signin';
import {
  Blur, Focus, Input, Submit,
} from '@/data/events';
import BaseButton from '@/components/baseButton';
import InputBase from '@/components/input';
import router from '@/index';
import LinkButton from '@/components/linkButton';

type SigninType = {
  title: string;
  input: Component;
  button: Component;
  link: Component;
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
      link: new LinkButton({
        linkClass: 'button__link',
        title: 'Войти',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            router.go('/');
          },
        },
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

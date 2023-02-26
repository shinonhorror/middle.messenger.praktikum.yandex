import tpl from './login';
import Component from '@/services/Component';
import {
  Blur, Focus, Input, Submit,
} from '@/data/events';
import BaseButton from '@/components/baseButton';
import inputDataLogin from '@/data/login';
import InputBase from '@/components/input';
import router from '@/index';
import LinkButton from '@/components/linkButton';

type LoginType = {
  title: string;
  auth: string;
  input: Component;
  button: Component;
  link: Component;
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
      link: new LinkButton({
        linkClass: 'button__link',
        title: 'Нет аккаунта?',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            router.go('/sign-up');
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
    const { focus, blur, input } = this._props.events as {
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
    if (!this._props.events) {
      return;
    }
    const { focus, blur, input } = this._props.events as {
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

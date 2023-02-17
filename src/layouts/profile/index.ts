import tpl from './profile';
import avatar from '~src/img/avatar.png';
import Component from '../../services/Component';
import BaseButton from '../../components/baseButton/index';
import inputDataPassword from '~src/data/password';
import {
  Blur, Focus, Input, Submit, openModal,
} from '~src/data/events';
import LinkButton from '~src/components/linkButton';
import dataSettings from '~src/data/settings';
import AuthControl from '~src/controllers/AuthControl';
import InputBase from '~src/components/input';
import router from '../../js/index';
import UserControl from '~src/controllers/UserControl';
import dataProfile from '~src/data/profile';
import connect from '~src/services/Connector';

type ProfileType = {
  user: string;
  chat: string;
  login?: string;
  settings?: string;
  password?: string;
  defaultAvatar: any;
  input: Component;
  button: Component;
};
export class Profile extends Component<ProfileType> {
  constructor(props: ProfileType) {
    super('div', {
      ...props,
      defaultAvatar: avatar,
    });
    AuthControl.authUser();
  }

  render(): DocumentFragment {
    if (window.location.pathname === '/profile') {
      this.profileProps();
    } else if (window.location.pathname === '/edit-profile') {
      this.settingsProps();
    } else if (window.location.pathname === '/change-password') {
      this.passwordProps();
    }
    this._props.chat = '/messenger';
    if (window.location.pathname === '/profile') {
      if (this._props.user) {
        this._children.input.setProps({
          data: dataProfile.data,
          user: this._props.user,
        });
      }
    } else if (window.location.pathname === '/edit-profile') {
      if (this._props.user) {
        this._children.input.setProps({
          data: dataSettings.data,
          user: this._props.user,
        });
      }
    }
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
    const a = this._element.querySelector('.profile__desc-avatar');
    a?.addEventListener('click', (event) => {
      event.preventDefault();
      const modal = this._element.querySelector('.modal') as HTMLElement;
      modal.classList.add('modal-active');
      openModal(event);
    });
    const chat = this._element.querySelector('.profile__back-link');
    chat?.addEventListener('click', () => {
      router.go('/messenger');
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
    const a = this._element.querySelector('.profile__desc-avatar');
    a?.removeEventListener('click', (event) => {
      event.preventDefault();
      const modal = this._element.querySelector('.modal') as HTMLElement;
      modal.classList.add('modal-active');
      openModal(event);
    });
    super.removeEvents();
  }

  passwordProps(): void {
    this._children.input = new InputBase({
      data: inputDataPassword.data,
    });
    this._children.button = new BaseButton('div', {
      buttonClass: 'button__base',
      title: 'Сохранить',
    });
    this._props.events = {
      submit: async (e: SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (form.classList.contains('modal-body')) {
          const formData1 = new FormData();
          const input = form.querySelector(
            '.modal-body_input',
          ) as HTMLInputElement;
          if (input.files) {
            formData1.set('avatar', input?.files[0]);
            UserControl.changeAvatar(formData1);
            return true;
          }
        }
        return Submit(e);
      },
      focus: Focus,
      blur: Blur,
      input: Input,
    };
  }

  settingsProps(): void {
    this._children.input = new InputBase({
      data: dataSettings.data,
    });
    this._children.button = new BaseButton('div', {
      buttonClass: 'button__base',
      title: 'Сохранить',
    });
    this._props.events = {
      submit: async (e: SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (form.classList.contains('modal-body')) {
          const formData1 = new FormData();
          const input = form.querySelector(
            '.modal-body_input',
          ) as HTMLInputElement;
          if (input.files) {
            formData1.set('avatar', input?.files[0]);
            UserControl.changeAvatar(formData1);
            return true;
          }
        }
        return Submit(e);
      },
      focus: Focus,
      blur: Blur,
      input: Input,
    };
  }

  profileProps(): void {
    this._children.input = new InputBase({
      data: dataProfile.data,
    });
    this._children.button = [
      new LinkButton({
        buttonClass: 'button__profile',
        linkClass: 'button__profile-link',
        title: 'Изменить данные',
        events: {
          click: async () => {
            router.go('/edit-profile');
          },
        },
      }),
      new LinkButton({
        buttonClass: 'button__profile',
        linkClass: 'button__profile-link',
        title: 'Изменить пароль',
        events: {
          click: async () => {
            router.go('/change-password');
          },
        },
      }),
      new LinkButton({
        buttonClass: 'button__profile-exit',
        linkClass: 'button__profile-link',
        title: 'Выйти',
        events: {
          click: async (e) => {
            e.preventDefault();
            await AuthControl.logout();
          },
        },
      }),
    ] as Component[];
    this._props.events = {
      submit: (e:SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (form.classList.contains('modal-body')) {
          const formData1 = new FormData();
          const input = form.querySelector('.modal-body_input') as HTMLInputElement;
          if (input.files) {
            formData1.set('avatar', input?.files[0]);
            UserControl.changeAvatar(formData1);
            return true;
          }
        }
        return false;
      },
    };
  }
}
const withUser = connect((state) => ({ user: { ...(state.user || {}) } }));
export const ProfileClass = withUser(Profile);

import tpl from './profile';
import avatar from '~src/img/avatar.png';
import Component from '../../services/Component';
import BaseButton from '../../components/baseButton/index';
import inputDataPassword from '~src/data/password';
import {
  Blur, Focus, Input, SubmitPhoto, openModal,
} from '~src/data/events';
import LinkButton from '~src/components/linkButton';
import dataSettings from '~src/data/settings';
import AuthControl from '~src/controllers/AuthControl';
import InputBase from '~src/components/input';
import router from '../../js/index';
import dataProfile from '~src/data/profile';
import connect from '~src/services/Connector';

type ProfileType = {
  user: string;
  login?: string;
  settings?: string;
  password?: string;
  defaultAvatar: any;
  input: Component;
  button: Component[] | Component;
  chatLink: Component;
};
export class Profile extends Component<ProfileType> {
  constructor(props: ProfileType) {
    super('div', {
      ...props,
      defaultAvatar: avatar,
      chatLink: new LinkButton({
        linkClass: 'profile__back-link',
        title: 'Back',
        events: {
          click: () => {
            router.go('/messenger');
          },
        },
      }),
      input: new InputBase({
        data:
          window.location.pathname === '/settings'
            ? dataProfile.data
            : window.location.pathname === '/settings-edit'
              ? dataSettings.data
              : inputDataPassword.data,
      }),
      button:
        window.location.pathname === '/settings'
          ? [
            new LinkButton({
              buttonClass: 'button__profile',
              linkClass: 'button__profile-link',
              title: 'Изменить данные',
              events: {
                click: async () => {
                  router.go('/settings-edit');
                },
              },
            }),
            new LinkButton({
              buttonClass: 'button__profile',
              linkClass: 'button__profile-link',
              title: 'Изменить пароль',
              events: {
                click: async () => {
                  router.go('/settings-password');
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
          ]
          : new BaseButton('div', {
            buttonClass: 'button__base',
            title: 'Сохранить',
          }),
      events:
        window.location.pathname === '/settings'
          ? {
            submit: SubmitPhoto,
          }
          : {
            submit: SubmitPhoto,
            focus: Focus,
            blur: Blur,
            input: Input,
          },
    });
    if (window.location.pathname === '/settings') {
      if (this._props.user) {
        this._children.input.setProps({
          data: dataProfile.data,
          user: this._props.user,
        });
      }
    } else if (window.location.pathname === '/settings-edit') {
      if (this._props.user) {
        this._children.input.setProps({
          data: dataSettings.data,
          user: this._props.user,
        });
      }
    }
    AuthControl.authUser();
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
    const a = this._element.querySelector('.profile__desc-avatar');
    a?.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(event);
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
      openModal(event);
    });
    super.removeEvents();
  }
}
const withUser = connect((state) => ({ user: { ...(state.user || {}) } }));
export const ProfileClass = withUser(Profile);

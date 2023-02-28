import tpl from './profile';
import avatar from '@/img/avatar.png';
import Component from '@/services/Component';
import BaseButton from '@/components/baseButton/index';
import inputDataPassword from '@/data/password';
import {
  Blur, Focus, Input, Submit, openModal,
} from '@/data/events';
import LinkButton from '@/components/linkButton';
import dataSettings from '@/data/settings';
import AuthControl from '@/controllers/AuthControl';
import InputBase from '@/components/input';
import router from '@/index';
import dataProfile from '@/data/profile';
import connect from '@/services/Connector';
import Modal from '@/modules/modal/modal';
import ResourceControl from '@/controllers/ResourceControl';
import UserControl from '@/controllers/UserControl';

type ProfileType = {
  user: string;
  login?: string;
  settings?: string;
  password?: string;
  defaultAvatar: any;
  input: Component;
  modalAvatar: Component;
  button: Component[] | Component;
  chatLink: Component;
};
export class Profile extends Component<ProfileType> {
  constructor(props: ProfileType) {
    super('div', {
      ...props,
      defaultAvatar: avatar,
      modalAvatar: new Modal({
        modalClass: 'modal',
        title: 'Загрузите файл',
        button: 'Загрузить',
        events: {
          change: async (e: InputEvent) => {
            e.preventDefault();
            const input = e.target as HTMLInputElement;
            const formData1 = new FormData();
            const modal = input.parentNode as HTMLElement;
            const img = modal.querySelector(
              '.modal-body_img',
            ) as HTMLImageElement;
            if (input.files) {
              formData1.set('resource', input?.files[0]);
              const data = await ResourceControl.getCreatedResource(formData1);
              img.setAttribute(
                'src',
                `https://ya-praktikum.tech/api/v2/resources${data.path}`,
              );
              img.style.display = 'block';
              img.style.borderRadius = '50%';
              img.dataset.id = data.id.toString();
            }
          },
          submit: (e: SubmitEvent) => {
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
                const modal = document.getElementById('openModal');
                if (modal) {
                  modal.classList.remove('modal-active');
                }
                return true;
              }
            }
            return false;
          },
        },
      }),
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
            submit: Submit,
          }
          : {
            submit: Submit,
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
    const { focus, blur, input } = this._props.events as {
      [key: string]: () => void;
    };
    this._element.querySelectorAll('input').forEach((a) => {
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
    const { focus, blur, input } = this._props.events as {
      [key: string]: () => void;
    };
    this._element.querySelectorAll('input').forEach((a) => {
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

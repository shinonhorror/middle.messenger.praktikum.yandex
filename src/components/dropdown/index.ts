import tpl from './dropdown';
import Component from '../../services/Component';
import ChatControl from '~src/controllers/ChatControl';
import { openModal } from '~src/data/events';
import UserControl from '~src/controllers/UserControl';
import { UserSearchClass } from '../userSearch';
import BaseButton from '../baseButton';
import { ChatType } from '~src/types/ChatTypes';
import LinkButton from '../linkButton';
import connect from '~src/services/Connector';

type DropdownType = {
  links?: Component[];
  btnClass?: string;
  title?: string;
  search?: boolean;
  button?: Component;
  searching?: Component;
  active: ChatType;
};
export default class Dropdown extends Component<DropdownType> {
  constructor(props: DropdownType) {
    super('div', {
      ...props,
      btnClass: 'fa-ellipsis-vertical',
      links: [
        new LinkButton({
          linkClass: 'dropdown__content-link',
          title: 'Информация о чате',
          events: {
            click: async (e) => {
              this.setProps({
                ...this._props,
                title: 'Информация о чате',
                search: false,
              });
              const users = await ChatControl.getUsers(
                this._props.active.id as string,
              );
              this._children.searching.setProps({
                searchType: 'info',
                users,
              });
              openModal(e);
            },
          },
        }),
        new LinkButton({
          linkClass: 'dropdown__content-link',
          title: 'Добавить пользователя',
          events: {
            click: (e) => {
              this.setProps({
                ...this._props,
                title: 'Добавить пользователя',
                search: true,
              });
              this._children.searching.setProps({
                searchType: 'add',
              });
              openModal(e);
            },
          },
        }),
        new LinkButton({
          linkClass: 'dropdown__content-link',
          title: 'Удалить пользователя',
          events: {
            click: (e) => {
              this.setProps({
                ...this._props,
                title: 'Удалить пользователя',
                search: true,
              });
              this._children.searching.setProps({
                searchType: 'delete',
              });
              openModal(e);
            },
          },
        }),
        new LinkButton({
          linkClass: 'dropdown__content-link',
          title: 'Удалить чат',
          events: {
            click: () => {
              if (this._props.active) {
                ChatControl.deleteChat({
                  chatId: this._props.active.id as string,
                });
              }
            },
          },
        }),
      ],
      button: new BaseButton('div', {
        buttonClass: 'button__base',
        title: 'Поиск',
      }),
      events: {
        submit: async (e: SubmitEvent) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const objectData: { [key: string]: FormDataEntryValue } = {};
          const mas = formData.entries();
          Array.from(mas).forEach((item) => {
            const key = 'login';
            const value = item[1];
            objectData[key] = value;
          });
          const users = await UserControl.searchUser(objectData);
          this._children.searching.setProps({
            users,
          });
          return true;
        },
      },
    });
    this._element.classList.add('dropdown');
  }

  render(): DocumentFragment {
    this._children.searching = new UserSearchClass({});
    return this.compile(tpl, { ...this._props });
  }

  addEvents(): void {
    if (!this._props.events) {
      return;
    }
    const { submit } = this._props.events as {
      [key: string]: () => void;
    };
    const modalForm = this._element.querySelector('.modal-body');
    modalForm?.addEventListener('submit', submit);
    super.addEvents();
  }

  removeEvents(): void {
    if (!this._props.events) {
      return;
    }
    const { submit } = this._props.events as {
      [key: string]: () => void;
    };
    const modalForm = this._element.querySelector('.modal-body');
    modalForm?.removeEventListener('submit', submit);
    super.removeEvents();
  }
}

const withActive = connect((state) => ({ active: { ...(state.active || {}) } }));

export const DropdownClass = withActive(Dropdown);

import tpl from './dropdown';
import Component from '../../services/Component';
import ChatControl from '~src/controllers/ChatControl';
import { openModal } from '~src/data/events';
import { store } from '~src/services/Store';
import UserControl from '~src/controllers/UserControl';
import { UserSearchClass } from '../userSearch';
import BaseButton from '../baseButton';
import { ChatType } from '~src/types/ChatTypes';

type DropdownType = {
  links?: Array<Record<string, string>>;
  btnClass?: string;
  title?: string;
  search?: boolean;
};
export default class Dropdown extends Component<DropdownType> {
  constructor(props: DropdownType) {
    super('div', props);
    this._element.classList.add('dropdown');
  }

  render(): DocumentFragment {
    this._children.button = new BaseButton('div', {
      buttonClass: 'button__base',
      title: 'Поиск',
    });
    this._children.searching = new UserSearchClass({});
    return this.compile(tpl, { ...this._props });
  }

  addEvents(): void {
    const activeChat = store.getState().active as ChatType;
    if (!activeChat) {
      return;
    }
    const { id } = activeChat;
    this._element
      .querySelectorAll('.dropdown__content-link')
      .forEach((link: HTMLElement) => {
        const classLink = link.dataset.class;
        if (classLink === 'item-delete-chat') {
          link.addEventListener('click', () => {
            if (activeChat) {
              ChatControl.deleteChat({
                chatId: id as string,
              });
            }
          });
        } else if (classLink === 'item-add') {
          link.addEventListener('click', (e) => {
            this.setProps({
              title: 'Добавить пользователя',
              search: true,
            });
            this._children.searching.setProps({
              searchType: 'add',
            });
            openModal(e);
          });
        } else if (classLink === 'item-del') {
          link.addEventListener('click', (e) => {
            this.setProps({
              title: 'Удалить пользователя',
              search: true,
            });
            this._children.searching.setProps({
              searchType: 'delete',
            });
            openModal(e);
          });
        } else if (classLink === 'item-info') {
          link.addEventListener('click', async (e) => {
            this.setProps({
              title: 'Информация о чате',
              search: false,
            });
            const users = await ChatControl.getUsers(id);
            this._children.searching.setProps({
              searchType: 'info',
              users,
            });
            openModal(e);
          });
        }
      });
    const modalForm = this._element.querySelector('.modal-body');
    modalForm?.addEventListener('submit', async (e: SubmitEvent) => {
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
    });
    super.addEvents();
  }

  removeEvents(): void {
    const activeChat = store.getState().active as ChatType;
    if (!activeChat) {
      return;
    }
    const { id } = activeChat;
    this._element
      .querySelectorAll('.dropdown__content-link')
      .forEach((link: HTMLElement) => {
        const classLink = link.dataset.class;
        if (classLink === 'item-delete-chat') {
          link.removeEventListener('click', () => {
            if (activeChat) {
              ChatControl.deleteChat({
                chatId: id as string,
              });
            }
          });
        } else if (classLink === 'item-add') {
          link.removeEventListener('click', (e) => {
            this.setProps({
              title: 'Добавить пользователя',
              search: true,
            });
            this._children.searching.setProps({
              searchType: 'add',
            });
            openModal(e);
          });
        } else if (classLink === 'item-del') {
          link.removeEventListener('click', (e) => {
            this.setProps({
              title: 'Удалить пользователя',
              search: true,
            });
            this._children.searching.setProps({
              searchType: 'delete',
            });
            openModal(e);
          });
        } else if (classLink === 'item-info') {
          link.removeEventListener('click', async (e) => {
            this.setProps({
              title: 'Информация о чате',
              search: false,
            });
            const users = await ChatControl.getUsers(id);
            this._children.searching.setProps({
              searchType: 'info',
              users,
            });
            openModal(e);
          });
        }
      });
    const modalForm = this._element.querySelector('.modal-body');
    modalForm?.removeEventListener('submit', async (e: SubmitEvent) => {
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
    });
    super.removeEvents();
  }
}

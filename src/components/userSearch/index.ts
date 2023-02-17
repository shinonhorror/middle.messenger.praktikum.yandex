import tpl from './userSearch';
import Component from '../../services/Component';
import avatar from '~src/img/avatar.png';
import ChatControl from '~src/controllers/ChatControl';
import connect from '~src/services/Connector';

type UserSearchBaseType = {
  users?: Array<Record<string, string>>;
  searchType?: string;
  active?: Array<Record<string, string>>;
};
export class UserSearch extends Component<UserSearchBaseType> {
  constructor(props: UserSearchBaseType) {
    super('div', props);
    this._element.classList.add('modal-body_result');
  }

  render(): DocumentFragment {
    this._props.users?.forEach((user) => {
      if (!user.avatar) {
        user.defaultAvatar = avatar;
      }
    });
    return this.compile(tpl, { ...this._props });
  }

  addEvents(): void {
    this._element.querySelectorAll('.modal-body_result__item').forEach((item:HTMLElement) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (this._props.active) {
          const { id } = this._props.active[0];
          if (this._props.searchType === 'add') {
            ChatControl.addUser({
              users: [item.dataset.id as string],
              chatId: id as string,
            });
          } else if (this._props.searchType === 'delete') {
            ChatControl.deleteUser({
              users: [item.dataset.id as string],
              chatId: id as string,
            });
          } else {
            return;
          }
        } else {
          return;
        }
        const modal = document.querySelector('.modal') as HTMLElement;
        modal.classList.remove('modal-active');
      });
    });
    super.addEvents();
  }

  // removeEvents(): void {
  //   this._element
  //     .querySelectorAll('.modal-body_result__item')
  //     .forEach((item: HTMLElement) => {
  //       item.removeEventListener('click', (e) => {
  //         e.preventDefault();
  //         const activeChat = this._props.active;
  //         if (activeChat) {
  //           if (this._props.searchType === 'add') {
  //             ChatControl.addUser({
  //               users: [item.dataset.id as string],
  //               chatId: activeChat.dataset.id as string,
  //             });
  //           } else if (this._props.searchType === 'delete') {
  //             ChatControl.deleteUser({
  //               users: [item.dataset.id as string],
  //               chatId: activeChat.dataset.id as string,
  //             });
  //           } else {
  //             return;
  //           }
  //         } else {
  //           return;
  //         }
  //         const modal = document.querySelector('.modal') as HTMLElement;
  //         modal.classList.remove('modal-active');
  //       });
  //     });
  //   super.removeEvents();
  // }
}
const withActive = connect((state) => ({ ...state }));

export const UserSearchClass = withActive(UserSearch);

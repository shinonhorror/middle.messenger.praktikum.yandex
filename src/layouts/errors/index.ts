import tpl from './errors';
import Component from '@/services/Component';
import router from '@/index';
import LinkButton from '@/components/linkButton';
import connect from '@/services/Connector';
import { UserType } from '@/types/UserTypes';

type ErrorType = {
  err?: boolean;
  link: Component;
  user: UserType;
};

export default class Error extends Component<ErrorType> {
  constructor(props: ErrorType) {
    super('div', {
      ...props,
      err: true,
      link: new LinkButton({
        linkClass: 'message__link',
        title: 'Назад',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            if (Object.keys(this._props.user).length !== 0) {
              router.go('/messenger');
            } else {
              router.go('/');
            }
          },
        },
      }),
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, { ...this._props });
  }
}

const withChat = connect((state) => ({ user: { ...(state.user || {}) } }));

export const ErrorClass = withChat(Error);

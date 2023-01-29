import tpl from './profile';

import Component from '../../services/Component';

type ProfileType = {
  chat: string;
  login?: string;
  settings?: string;
  password?:string;
  avatar: any;
  input: Component;
  button: Component;
};
export default class Profile extends Component<ProfileType> {
  render(): DocumentFragment {
    return this.compile(tpl);
  }

  addEvents(): void {
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

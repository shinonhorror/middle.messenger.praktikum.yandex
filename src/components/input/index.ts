import tpl from './input';

import Component from '../../services/Component';

type InputBaseType = {
  data: Array<{ [key: string]: string }>;
  user?: Record<string, string>
};
export default class InputBase extends Component<InputBaseType> {
  constructor(props: InputBaseType) {
    super('div', props);
  }

  render(): DocumentFragment {
    this._props.data.forEach((item) => {
      if (this._props.user) {
        item.value = this._props.user[item.inputName] as string;
      }
    });

    return this.compile(tpl, { ...this._props });
  }
}

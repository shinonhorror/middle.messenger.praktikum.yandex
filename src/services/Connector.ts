import { Indexed } from '@/utils/helpers';
import Component from './Component';
import { StoreEvents, store } from './Store';

interface ComponentsType<T = { [x: string]: unknown }> {
  new (props: T): Component<T>;
}

export default function connect(mapStateToProps: (state: any) => Indexed) {
  return function (comp: ComponentsType<any>) {
    return class extends comp {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          this.setProps({ ...newState });
          state = newState;
        });
      }
    };
  };
}

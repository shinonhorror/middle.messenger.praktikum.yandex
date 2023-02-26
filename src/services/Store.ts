import set from '@/utils/set';
import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  static STORE_NAME = 'mChatStore';

  constructor() {
    super();

    const savedState = localStorage.getItem(Store.STORE_NAME);

    this.state = savedState ? JSON.parse(savedState) ?? {} : {};

    this.on(StoreEvents.Updated, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this.state));
    });
  }

  private state:any = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    const prevState = { ...this.state };

    this.state = set(this.state, path, value);

    this.emit(StoreEvents.Updated, prevState, this.state);
  }

  public removeState() {
    this.state = {};
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();

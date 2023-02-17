import UserAPI from '~src/api/UserAPI';
import router from '~src/js';
import { store } from '~src/services/Store';
import { UserUpdatePassType, UserUpdateType } from '~src/types/UserTypes';
import ResourceControl from './ResourceControl';

const userApi = new UserAPI();

class UserControl {
  public async changeProfile(data: UserUpdateType) {
    try {
      const user = await userApi.update(data, '/profile');
      user.avatar = await ResourceControl.getResource(user.avatar);
      store.set('user', user);
      router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  public async searchUser(data: { [key: string]: FormDataEntryValue }) {
    return userApi.search(data);
  }

  public async changePassword(data: UserUpdatePassType) {
    try {
      await userApi.update(data, '/password');
      router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  public async changeAvatar(data: FormData) {
    try {
      const user = await userApi.updateAvatar(data);
      user.avatar = await ResourceControl.getResource(user.avatar);
      store.set('user', user);
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new UserControl();

import UserAPI from '@/api/UserAPI';
import router from '@/index';
import { store } from '@/services/Store';
import { UserUpdatePassType, UserUpdateType } from '@/types/UserTypes';
import ResourceControl from './ResourceControl';

const userApi = new UserAPI();

class UserControl {
  public async changeProfile(data: UserUpdateType) {
    try {
      const login = { login: data.login };
      const isUser = await this.searchUser(login);
      if (isUser.length !== 0) {
        if (data.login === isUser[0].login) {
          router.go('/settings');
          throw new Error('Такой логин уже существует');
        }
      }
      const user = await userApi.update(data, '/profile');
      user.avatar = (await ResourceControl.getResource(user.avatar)) as string;
      store.set('user', user);
      router.go('/settings');
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  public async searchUser(data: { [key: string]: FormDataEntryValue }) {
    return userApi.search(data);
  }

  public async changePassword(data: UserUpdatePassType) {
    try {
      await userApi.update(data, '/password');
      router.go('/settings');
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

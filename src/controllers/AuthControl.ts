import AuthAPI from '~src/api/AuthAPI';
import router from '~src/js';
import { store } from '~src/services/Store';
import ResourceControl from './ResourceControl';
import avatar from '~src/img/avatar.png';

const signInApi = new AuthAPI();

interface Sign {
  id?: number;
  first_name?: string;
  second_name?: string;
  login: string;
  email?: string;
  password: string;
  phone?: string;
  avatar?: string;
}

class AuthControl {
  public async login(data: Sign) {
    try {
      await signInApi.request(data, '/signin');
      await this.authUser();
      router.go('/messenger');
    } catch (e: any) {
      const span = document.querySelector('.error-span-reason') as HTMLElement;
      span.textContent = e;
    }
  }

  public async signup(data: Sign) {
    try {
      await signInApi.request(data, '/signup');
      await this.authUser();
      router.go('/settings');
    } catch (e: any) {
      const span = document.querySelector('.error-span-reason') as HTMLElement;
      span.textContent = e;
    }
  }

  public async authUser() {
    try {
      const user = await signInApi.user();
      if (user.avatar) {
        user.avatar = (await ResourceControl.getResource(
          user.avatar as string,
        )) as string;
      } else {
        user.avatar = avatar;
      }
      store.set('user', user);
      store.set('isAuth', true);
    } catch (e) {
      console.error(e);
    }
  }

  public async getUser() {
    await this.authUser();
    const user = await signInApi.user();
    return user;
  }

  public async logout() {
    try {
      await signInApi.delete();
      store.removeState();
      router.go('/');
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new AuthControl();

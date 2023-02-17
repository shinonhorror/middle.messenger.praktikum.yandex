import AuthAPI from '~src/api/AuthAPI';
import router from '~src/js';
import { store } from '~src/services/Store';
import ResourceControl from './ResourceControl';

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
      router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  public async signup(data: Sign) {
    try {
      await signInApi.request(data, '/signup');
      await this.authUser();
      router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  public async authUser() {
    try {
      const user = await signInApi.user();
      user.avatar = await ResourceControl.getResource(user.avatar);
      store.set('user', user);
      store.set('isAuth', true);
    } catch (e) {
      console.error(e);
    }
  }

  public async getUser() {
    const user = await signInApi.user();
    return user;
  }

  public async logout() {
    try {
      await signInApi.delete();
      store.removeState();
      router.go('/sign-in');
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new AuthControl();

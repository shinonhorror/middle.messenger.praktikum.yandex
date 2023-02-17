import AuthAPI from '~src/api/AuthAPI';
import router from '~src/js';
import { store } from '~src/services/Store';

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
      this.authUser();
      router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  public async signup(data: Sign) {
    try {
      await signInApi.request(data, '/signup');
      this.authUser();
      router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  public async authUser() {
    try {
      const user = await signInApi.user();
      store.set('user', user);
      store.set('isAuth', true);
    } catch (e) {
      console.error(e);
    }
  }

  public async getUser() {
    return signInApi.user();
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

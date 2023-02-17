import '../style/index.scss';
import Login from '~src/layouts/login';
import Error from '~src/layouts/errors';
import Signin from '~src/layouts/signup';
import Router from '~src/services/Router';
import { ProfileClass } from '~src/layouts/profile';
import { ChatClass } from '~src/layouts/chat';
import { store } from '~src/services/Store';

enum Routes {
  Log = '/',
  Auth = '/sign-up',
  Prof = '/profile',
  Messages = '/messenger',
  NorFound = '/404',
  Set = '/edit-profile',
  Password = '/change-password',
  Err = '/500',
}

const router = new Router();
window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Log, Login)
    .use(Routes.Auth, Signin)
    .use(Routes.Err, Error)
    .use(Routes.NorFound, Error)
    .use(Routes.Prof, ProfileClass)
    .use(Routes.Messages, ChatClass)
    .use(Routes.Password, ProfileClass)
    .use(Routes.Set, ProfileClass)
    .start();
  const user = store.getState();
  if (user.isAuth) {
    router.start();
    router.go(Routes.Prof);
  } else {
    router.start();
    router.go(Routes.Log);
  }
});

export default router;

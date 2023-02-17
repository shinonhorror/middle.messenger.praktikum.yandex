import '../style/index.scss';
import Home from '~src/layouts/home';
import Login from '~src/layouts/login';
import Error from '~src/layouts/errors';
import Signin from '~src/layouts/signin';
import Router from '~src/services/Router';
import { ProfileClass } from '~src/layouts/profile';
import { ChatClass } from '~src/layouts/chat';
import { store } from '~src/services/Store';

enum Routes {
  Index = '/',
  Log = '/sign-in',
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
    .use(Routes.Index, Home)
    .use(Routes.Log, Login)
    .use(Routes.Auth, Signin)
    .use(Routes.Err, Error)
    .use(Routes.Prof, ProfileClass)
    .use(Routes.Messages, ChatClass)
    .use(Routes.NorFound, Error)
    .use(Routes.Password, ProfileClass)
    .use(Routes.Set, ProfileClass)
    .start();
  const user = store.getState();
  if (user.isAuth) {
    router.start();
  } else {
    router.start();
    router.go(Routes.Log);
  }
});

export default router;

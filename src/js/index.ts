import '../style/index.scss';
import Login from '~src/layouts/login';
import { ErrorClass } from '~src/layouts/errors';
import Signin from '~src/layouts/signup';
import Router from '~src/services/Router';
import { ProfileClass } from '~src/layouts/profile';
import { ChatClass } from '~src/layouts/chat';
import AuthControl from '~src/controllers/AuthControl';

enum Routes {
  Log = '/',
  Auth = '/sign-up',
  Prof = '/settings',
  Messages = '/messenger',
  NorFound = '/404',
  Set = '/settings/edit',
  Password = '/settings/editPassword',
  Err = '/500',
}

const router = new Router();
window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Log, Login)
    .use(Routes.Auth, Signin)
    .use(Routes.Err, ErrorClass)
    .use(Routes.NorFound, ErrorClass)
    .use(Routes.Prof, ProfileClass)
    .use(Routes.Messages, ChatClass)
    .use(Routes.Password, ProfileClass)
    .use(Routes.Set, ProfileClass)
    .start();
  const user = await AuthControl.getUser();
  if (user) {
    if (user && window.location.pathname === Routes.Log) {
      router.go(Routes.Prof);
    }
  }
  if (window.location.pathname === '*') {
    if (user) {
      router.go(Routes.Prof);
    } else {
      router.go(Routes.Log);
    }
  }
  router.start();
});

export default router;

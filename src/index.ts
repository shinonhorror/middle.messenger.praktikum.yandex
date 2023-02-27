import '@/style/index.scss';
import Login from '@/layouts/login';
import { ErrorClass } from '@/layouts/errors';
import Signin from '@/layouts/signup';
import { ProfileClass } from '@/layouts/profile';
import { ChatClass } from '@/layouts/chat';
import AuthControl from '@/controllers/AuthControl';
import router from '@/services/Router';

enum Routes {
  Log = '/',
  Auth = '/sign-up',
  Prof = '/settings',
  Messages = '/messenger',
  NorFound = '/404',
  Set = '/settings-edit',
  Password = '/settings-password',
  Err = '/500',
}

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

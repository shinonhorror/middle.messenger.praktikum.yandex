import '../style/index.scss';
import Nav from '../components/navbar/index';
import Home from '~src/layouts/home';
import Login from '~src/layouts/login';
import BaseButton from '../components/baseButton/index';
import Chat from '~src/layouts/chat';
import Profile from '~src/layouts/profile';
import Error from '~src/layouts/errors';
import avatar from '../img/avatar.png';
import render from '~src/utils/pagesRender';
import Signin from '~src/layouts/signin';
import {
  Submit, Focus, Blur, Input,
} from '~src/data/events';
import inputDataLogin from '~src/data/login';
import InputBase from '~src/components/input';
import inputDataSignin from '~src/data/signin';
import ChatItem from '~src/components/chatItem';
import dataChats from '~src/data/chats';
import MessageItem from '~src/components/messageItem';
import dataMessage from '~src/data/messages';
import inputDataPassword from '~src/data/password';
import dataSettings from '~src/data/settings';
import LinkButton from '~src/components/linkButton';
import { dataProfile, buttonProfile } from '~src/data/profile';

const loginPage = new Login('div', {
  title: 'Вход',
  auth: '#/auth',
  input: new InputBase('div', {
    data: inputDataLogin.data,
  }),
  events: {
    submit: Submit,
    focus: Focus,
    blur: Blur,
    input: Input,
  },
  button: new BaseButton('div', {
    buttonClass: 'button__base',
    href: '#/chat',
    title: 'Войти',
  }),
});

const homePage = new Home('div', {
  title: 'Страницы',
  events: {},
  nav: new Nav('nav', {
    login: '#/login',
    auth: '#/auth',
    chat: '#/chat',
    profile: '#/profile',
    error: '#/500',
    notFound: '#/404',
  }),
});

const signinPage = new Signin('div', {
  title: 'Регистрация',
  login: '#/login',
  input: new InputBase('div', {
    data: inputDataSignin.data,
  }),
  events: {
    submit: Submit,
    focus: Focus,
    blur: Blur,
    input: Input,
  },
  button: new BaseButton('div', {
    buttonClass: 'button__base',
    href: '#/chat',
    title: 'Зарегестрироваться',
  }),
});

const chatPage = new Chat('div', {
  profile: '#/profile',
  avatar,
  chats: new ChatItem('div', {
    data: dataChats.data,
  }),
  messages: new MessageItem('div', {
    data: dataMessage.data,
  }),
  events: {
    submit: Submit,
    focus: Focus,
    blur: Blur,
    input: Input,
  },
});

const profilePage = new Profile('div', {
  chat: '#/chat',
  login: '#/login',
  avatar,
  events: {},
  input: new InputBase('div', {
    data: dataProfile.data,
  }),
  button: new LinkButton('div', {
    data: buttonProfile.data,
  }),
});

const settingsPage = new Profile('div', {
  chat: '#/chat',
  avatar,
  input: new InputBase('div', {
    data: dataSettings.data,
  }),
  events: {
    submit: Submit,
    focus: Focus,
    blur: Blur,
    input: Input,
  },
  button: new BaseButton('div', {
    buttonClass: 'button__base',
    href: '#/profile',
    title: 'Сохранить',
  }),
});

const passwordPage = new Profile('div', {
  chat: '#/chat',
  settings: '#/settings',
  password: '#/password',
  avatar,
  input: new InputBase('div', {
    data: inputDataPassword.data,
  }),
  events: {
    submit: Submit,
    focus: Focus,
    blur: Blur,
    input: Input,
  },
  button: new BaseButton('div', {
    buttonClass: 'button__base',
    href: '#/profile',
    title: 'Сохранить',
  }),
});

const errorPage = new Error('div', {
  chat: '#/chat',
  code: '505',
  desc: 'Мы уже фиксим',
});

const notFoundPage = new Error('div', {
  chat: '#/chat',
  code: '404',
  desc: 'Не туда попали',
});

const locationSwitch = () => {
  switch (window.location.hash) {
    case '':
      render('#root', homePage);
      break;
    case '#/login':
      render('#root', loginPage);
      break;
    case '#/auth':
      render('#root', signinPage);
      break;
    case '#/chat':
      render('#root', chatPage);
      break;
    case '#/profile':
      render('#root', profilePage);
      break;
    case '#/settings':
      render('#root', settingsPage);
      break;
    case '#/password':
      render('#root', passwordPage);
      break;
    case '#/500':
      render('#root', errorPage);
      break;
    case '#/404':
      render('#root', notFoundPage);
      break;
    default:
      break;
  }
};

window.addEventListener('load', () => {
  locationSwitch();
});

window.addEventListener('hashchange', () => {
  locationSwitch();
});

# Чат

- Макет в [Figma](https://www.figma.com/file/JMrYsNDU9WFpyNyoSeBL2u/Chat_UI?node-id=1%3A498&t=AiHaW2LRE6iwSB9m-0)
- Опубликованное приложение в [Netify](https://mchat-app-yandex.netlify.app/)
- Опубликованное приложение в [Render](https://mchat-53yz.onrender.com/)

## Ссылка на PR https://github.com/shinonhorror/middle.messenger.praktikum.yandex/pull/4

## Описание приложения

Данное приложение - самостоятельная практическая работа, которая выполняется в рамках курса [Мидл фронтенд-разработчик](https://practicum.yandex.ru/middle-frontend/).

## Первый спринт

[Ветка sprint_1](https://github.com/shinonhorror/middle.messenger.praktikum.yandex/tree/sprint_1)

- Небольшое изменение дизайна шаблона
- Использован шаблонизатор [Handlebars](https://handlebarsjs.com/)
- Сборка настроена с помощью [Parcel](https://parceljs.org/)
- Использован препроцессор [SCSS](https://sass-scss.ru/)
- Верстка реализована с помощью шаблонизатора
- Код разделен на модули
- Настроен Express-сервер с раздачей статики, запуск на 3000 порту
- Все стили написаны для каждой страницы по отдельности, также есть файл с общими стилями для всего приложения

## Второй спринт

[Ветка sprint_2](https://github.com/shinonhorror/middle.messenger.praktikum.yandex/tree/sprint_2)

- Добавлен [Eslint](https://eslint.org/)
- Добавлен [Stylelint](https://stylelint.io/)
- Произведена миграция с js на ts
- Сверстана страница со списком чатов и лентой переписки. 
- Добавлен компонентный подход в проект
- Добавлен сбор данных из формы в консоль
- Добавлена валидация на все формы по событиям focus/blur/input
- Добавлен класс для работы с запросами

## Третий спринт

[Ветка sprint_3](https://github.com/shinonhorror/middle.messenger.praktikum.yandex/tree/sprint_3)

- Добавлен роутинг в проект
  - Реализован роутер
  - У всех страниц - собственный роут
  - В DOM активна только одна страница
  - При обновлении страницы отображается та же самая страница
  - Работают переходы по страницам через нажатия на кнопки
  - Работают переходы "назад" и "вперед" через интерфейс браузера
- Внедрен HTTP API чатов, а именно:
  - Авторизация (регистрация, авторизация, выход из системы)
  - Работа с информацией пользователя (изменение данных, автара и пароля)
  - Работа с чатами (список чатов, создание и удаление чата, добавление и удаление пользователя из чата, информация о чате, изменение аватарки чата)
- Подключен WebSocket для работы с real-time сообщениями
- Проект защищен от XSS и DOS

## Четвертый спринт

[Ветка sprint_4](https://github.com/shinonhorror/middle.messenger.praktikum.yandex/tree/sprint_4)

- Сборка настроена с помощью [Webpack](https://webpack.js.org/). Настроены лоадеры:
  - для работы с TypeScript
  - для работы с SCSS
  - для работы с Handlebars
- Настроена Docker-сборка статического приложения
- Проект размещен на [Render](https://render.com/) c Docker-сборкой
- Настроен pre-commit на проект с помощью:
  - [husky](https://typicode.github.io/husky/#/)
  - [lint-staged](https://www.npmjs.com/package/lint-staged)
- Проведен аудит пакетов
- Написаны тесты с использованием [Mocha](https://mochajs.org/) и [Chai](https://www.chaijs.com/) для:
  - Роутера
  - Компонента
  - Модуля отправки запросов

## Сборка и запуск проекта

Сборка проекта. Используемый сборщик - [Webpack](https://webpack.js.org/)

```
npm run build
```

Старт сервера Express для раздачи статики из `./dist`:

```
npm run start
```

Запуск проект в режиме разработки

```
npm run dev
```

Автоматическон исправление Eslint

```
npm run fix
```

Автоматическон исправление Stylelint

```
npm run lint
```

Запуск тестов

```
npm run test
```

[![Netlify Status](https://api.netlify.com/api/v1/badges/0589535f-ff18-43b2-9d5f-e84df8d13eaa/deploy-status)](https://app.netlify.com/sites/mchat-app-yandex/deploys)

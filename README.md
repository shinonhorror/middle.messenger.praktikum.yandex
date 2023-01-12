# Чат

* Макет в Figma [https://www.figma.com/file/JMrYsNDU9WFpyNyoSeBL2u/Chat_UI?node-id=1%3A498&t=AiHaW2LRE6iwSB9m-0](https://www.figma.com/file/JMrYsNDU9WFpyNyoSeBL2u/Chat_UI?node-id=1%3A498&t=AiHaW2LRE6iwSB9m-0)
* Опубликованное приложение в Netify: https://mchat-app-yandex.netlify.app/

## Описание приложения

Данное приложение - самостоятельная практическая работа, которая выполняется в рамках курса [Мидл фронтенд-разработчик] (https://practicum.yandex.ru/middle-frontend/).

## Первый спринт

[Brunch sprint_1](https://github.com/shinonhorror/middle.messenger.praktikum.yandex/tree/sprint_1)

* Небольшое изменение дизайна шаблона 
* Использован шаблонизатор [Handlebars](https://handlebarsjs.com/)
* Сборка настроена с помощью [Parcel](https://parceljs.org/)
* Использован препроцессор [SCSS](https://sass-scss.ru/) 
* Верстка реализована с помощью шаблонизатора
* Код разделен на модули
* Настроен Express-сервер с раздачей статики, запуск на 3000 порту

## Сборка и запуск проекта

Сборка проекта. Используемый сборщик - [Parcel](https://parceljs.org/)

```
npm run build
```

Старт сервера Express для раздачи статики из `./dist`:

```
npm run start
```

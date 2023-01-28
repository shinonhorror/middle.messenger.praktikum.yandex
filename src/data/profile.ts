export const dataSettings: { [key: string]: unknown } = {
  data: [
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Почта',
      type: 'email',
      value: 'pochta@yandex.ru',
      inputName: 'email',
    }, {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Логин',
      type: 'text',
      value: 'ivanivanov',
      inputName: 'login',
    }, {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Имя',
      type: 'text',
      value: 'Иван',
      inputName: 'first_name',
    }, {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Фамилия',
      type: 'text',
      value: 'Иванов',
      inputName: 'second_name',
    }, {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Имя в чате',
      type: 'text',
      value: 'Иван',
      inputName: 'display_name',
    }, {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Телефон',
      type: 'phone',
      value: '+7(909)9673030',
      inputName: 'phone',
    },
  ],
};

export const buttonProfile: { [key: string]: unknown } = {
  data: [
    {
      buttonClass: 'button__profile',
      linkClass: 'button__profile-link',
      href: '#/settings',
      title: 'Изменить данные',
    }, {
      buttonClass: 'button__profile',
      linkClass: 'button__profile-link',
      href: '#/password',
      title: 'Изменить пароль',
    }, {
      buttonClass: 'button__profile-exit',
      linkClass: 'button__profile-link',
      href: '#/login',
      title: 'Выйти',
    },
  ],

};

// const dataProfile = {...dataSettings};
// export const a = dataProfile.data.map((key) => {
//   key.disabled = "disabled";
// });

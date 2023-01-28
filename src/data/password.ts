const inputDataPassword: { [key: string]: unknown } = {
  data: [
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Старый пароль',
      type: 'password',
      inputName: 'password',
    }, {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Новый пароль',
      type: 'password',
      inputName: 'oldPassword',
    }, {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Повторите новый пароль',
      type: 'password',
      inputName: 'newPassword',
    },
  ],
};

export default inputDataPassword;

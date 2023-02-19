const inputDataPassword: { [key: string]: Array<{ [value: string]: string }> } = {
  data: [
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Старый пароль',
      type: 'password',
      inputName: 'oldPassword',
    },
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Новый пароль',
      type: 'password',
      inputName: 'newPassword',
    },
    {
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

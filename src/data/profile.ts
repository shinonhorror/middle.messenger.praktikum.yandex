const dataProfile: {
  [key: string]: Array<{ [value: string]: string }>;
} = {
  data: [
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Почта',
      type: 'email',
      value: 'pochta@yandex.ru',
      inputName: 'email',
      disabled: 'disabled',
    },
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Логин',
      type: 'text',
      value: 'ivanivanov',
      inputName: 'login',
      disabled: 'disabled',
    },
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Имя',
      type: 'text',
      value: 'Иван',
      inputName: 'first_name',
      disabled: 'disabled',
    },
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Фамилия',
      type: 'text',
      value: 'Иванов',
      inputName: 'second_name',
      disabled: 'disabled',
    },
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Имя в чате',
      type: 'text',
      value: 'Иван',
      inputName: 'display_name',
      disabled: 'disabled',
    },
    {
      itemClass: 'profile__desc__item',
      labelClass: 'profile__desc__item-title',
      inputClass: 'profile__desc__item-value',
      title: 'Телефон',
      type: 'phone',
      value: '+7(909)9673030',
      inputName: 'phone',
      disabled: 'disabled',
    },
  ],
};
export default dataProfile;

const inputDataSignin: { [key: string]: unknown } = {
  data: [
    {
      inputClass: 'signin__input',
      type: 'email',
      placeholder: 'Почта',
      inputName: 'email',
      required: 'required',
    },
    {
      inputClass: 'signin__input',
      type: 'text',
      placeholder: 'Логин',
      inputName: 'login',
      required: 'required',
    }, {
      inputClass: 'signin__input',
      type: 'text',
      placeholder: 'Имя',
      inputName: 'first_name',
      required: 'required',
    }, {
      inputClass: 'signin__input',
      type: 'text',
      placeholder: 'Фамилия',
      inputName: 'second_name',
      required: 'required',
    }, {
      inputClass: 'signin__input',
      type: 'phone',
      placeholder: 'Телефон',
      inputName: 'phone',
      required: 'required',
    }, {
      inputClass: 'signin__input',
      type: 'password',
      placeholder: 'Пароль',
      inputName: 'password',
      required: 'required',
    }, {
      inputClass: 'signin__input',
      type: 'password',
      placeholder: 'Повторите',
      inputName: 'password',
      required: 'required',
    },
  ],
};

export default inputDataSignin;

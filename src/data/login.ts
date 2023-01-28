const inputDataLogin: { [key: string]: Array<{ [value: string]: string }> } = {
  data: [
    {
      inputClass: 'login__input',
      type: 'login',
      placeholder: 'Логин',
      inputName: 'login',
      required: 'required',
    },
    {
      inputClass: 'login__input',
      type: 'password',
      placeholder: 'Пароль',
      inputName: 'password',
      required: 'required',
    },
  ],
};

export default inputDataLogin;

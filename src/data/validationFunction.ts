const validLogin = (value: string):string => {
  if (value === '') {
    return 'Поле не должно быть пустым';
  }
  if (value.length < 3 || value.length > 20) {
    return 'Логин должен быть от 3 до 20 символов';
  }
  if (!/[^0-9]/.test(value)) {
    return 'Логин не может содержать только числа';
  }
  if (value.includes(' ')) {
    return 'Логин не может содержать пробелы';
  }
  if (!/[a-zA-Z0-9-_]/.test(value)) {
    return 'Логин может состоять только из латиницы, цифр, подчеркивания и дефиса';
  }
  return '';
};

const validMessage = (value: string):string => {
  if (value === '') {
    return 'Поле не должно быть пустым';
  }
  return '';
};

const validPassword = (value: string):string => {
  if (value === '') {
    return 'Поле не должно быть пустым';
  }
  if (value.length < 8 || value.length > 40) {
    return 'Пароль должен быть от 8 до 40 символов';
  }
  if (value.includes(' ')) {
    return 'Пароль не может содержать пробелы';
  }
  if (!/(?=.*[A-Z]|[А-Я])/.test(value)) {
    return 'Пароль должен содержать хотя бы одну заглавную букву';
  }
  if (!/(?=.*[0-9])/.test(value)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }
  return '';
};

const validPhone = (value: string):string => {
  if (value === '') {
    return 'Поле не должно быть пустым';
  }
  if (value.includes(' ')) {
    return 'Поле не может содержать пробелы';
  }
  if (!/^[8|\\+7]/.test(value)) {
    return 'Телефон должен начинаться с 8 или с +7';
  }
  if (value.length < 10 || value.length > 15) {
    return 'Телефон должен быть от 10 до 15 символов';
  }
  if (!/[0-9]/.test(value)) {
    return 'Пароль должен состоять только из цифр';
  }
  return '';
};

const validEmail = (value: string):string => {
  if (value === '') {
    return 'Поле не должно быть пустым';
  }
  if (value.includes(' ')) {
    return 'Поле не может содержать пробелы';
  }
  if (!/^[A-z0-9-_]+@([A-z]+\.)+[A-z]{1,4}$/.test(value)) {
    return 'Почта обязательно должна содержать символ @, текст после нее и точку';
  }
  return '';
};

const validName = (value: string):string => {
  if (value === '') {
    return 'Поле не должно быть пустым';
  }
  if (value.includes(' ')) {
    return 'Поле не может содержать пробелы';
  }
  if (!/^([A-ZА-ЯЁ]{1}[а-яё]{1,}|[A-Z]{1}[a-z]{1,})$/.test(value)) {
    return 'Поле может содержать только латиницу или кириллицу';
  }
  return '';
};

const validFunction: { [key: string]: (value: string) => string } = {
  login: validLogin,
  password: validPassword,
  email: validEmail,
  phone: validPhone,
  message: validMessage,
  first_name: validName,
  second_name: validName,
  oldPassword: validPassword,
  newPassword: validPassword,
  display_name: validMessage,
  search: validLogin,
};

export default validFunction;

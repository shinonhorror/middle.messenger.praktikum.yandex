const regularExpression: { [key: string]: string } = {
  login: '(?=.*[A-z])[a-zA-Z0-9-_]{3,20}$',
  password: '(?=.*[A-Z]|[А-Я])(?=.*[0-9])[^\\s]{8,40}$',
  email: '^[A-z0-9-_]+@([A-z]+\\.)+[A-z]{1,4}$',
  phone: '(?=^.{10,15}$)^[8|\\+7]+[0-9]',
  message: '.',
  first_name: '^([A-ZА-ЯЁ]{1}[а-яё]{1,}|[A-Z]{1}[a-z]{1,})$',
  second_name: '^([A-ZА-ЯЁ]{1}[а-яё]{1,}|[A-Z]{1}[a-z]{1,})$',
  oldPassword: '(?=.*[A-Z]|[А-Я])(?=.*[0-9])[^\\s]{8,40}$',
  newPassword: '(?=.*[A-Z]|[А-Я])(?=.*[0-9])[^\\s]{8,40}$',
  display_name: '.',
};

export default regularExpression;

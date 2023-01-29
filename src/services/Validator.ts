import regularExpression from '~src/data/regularExpression';
import validFunction from '~src/data/validationFunction';

export default function validator(element: HTMLInputElement):void {
  const expression = regularExpression[element.name];
  const reg = new RegExp(expression);
  const parent = element.parentElement as HTMLElement;
  const span = element.nextElementSibling || parent.nextElementSibling as HTMLSpanElement;
  const validation = validFunction[element.name];
  const { value } = element;
  if (reg.test(value)) {
    if (element.name !== 'message') {
      span.textContent = validation(value);
    } else {
      element.placeholder = validation(value);
    }
    element.classList.remove('error');
  } else {
    if (element.name !== 'message') {
      span.textContent = validation(value);
    } else {
      element.placeholder = validation(value);
    }
    element.classList.add('error');
  }
}

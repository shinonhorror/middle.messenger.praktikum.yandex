import regularExpression from '~src/data/regularExpression';
import validFunction from '~src/data/validationFunction';

export default function validator(element: HTMLInputElement):boolean {
  const expression = regularExpression[element.name];
  const reg = new RegExp(expression);
  const parent = element.parentElement as HTMLElement;
  const span = element.nextElementSibling || parent.nextElementSibling as HTMLSpanElement;
  if (element.name === 'avatar') {
    return true;
  }
  const spanReason = document.querySelector('.error-span_reason') as HTMLElement;
  if (spanReason) {
    spanReason.textContent = '';
  }
  const validation = validFunction[element.name];
  const { value } = element;
  if (reg.test(value)) {
    if (element.name === 'message') {
      element.placeholder = validation(value);
    } else {
      span.textContent = validation(value);
    }
    element.classList.remove('error');
    return true;
  }
  if (element.name === 'message') {
    element.placeholder = validation(value);
  } else {
    span.textContent = validation(value);
  }
  element.classList.add('error');
  return false;
}

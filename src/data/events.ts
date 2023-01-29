import validator from '~src/services/Validator';

export function Submit(e: SubmitEvent):void {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const objectData: { [key: string]: FormDataEntryValue } = {};
  const formData = new FormData(form);
  const mas = formData.entries();
  form.querySelectorAll('input').forEach((a) => {
    validator(a);
  });
  Array.from(mas).forEach((item) => {
    const key = item[0];
    const value = item[1];
    objectData[key] = value;
  });
  console.log(objectData);
}

export function Focus(e: InputEvent):void {
  validator(e.target as HTMLInputElement);
}

export function Blur(e: InputEvent):void {
  validator(e.target as HTMLInputElement);
}

export function Input(e: InputEvent):void {
  validator(e.target as HTMLInputElement);
}

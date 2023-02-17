import AuthControl from '~src/controllers/AuthControl';
import ChatControl from '~src/controllers/ChatControl';
import UserControl from '~src/controllers/UserControl';
import WebSocketControl from '~src/controllers/WebSocketControl';
import validator from '~src/services/Validator';
import { UserSign, UserUpdatePassType, UserUpdateType } from '~src/types/UserTypes';

export async function Submit(e: SubmitEvent): Promise<boolean> {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const objectData: { [key: string]: FormDataEntryValue } = {};
  const formData = new FormData(form);
  const mas = formData.entries();
  let isValid;
  form.querySelectorAll('input').forEach((a) => {
    if (validator(a) === false) {
      isValid = false;
    }
  });
  if (isValid === false) {
    return false;
  }
  Array.from(mas).forEach((item) => {
    const key = item[0];
    const value = item[1];
    objectData[key] = value;
  });
  if (window.location.pathname === '/sign-in') {
    await AuthControl.login(objectData as unknown as UserSign);
  } else if (window.location.pathname === '/edit-profile') {
    await UserControl.changeProfile(objectData as unknown as UserUpdateType);
  } else if (window.location.pathname === '/change-password') {
    await UserControl.changePassword(objectData as unknown as UserUpdatePassType);
  } else if (window.location.pathname === '/sign-up') {
    await AuthControl.signup(objectData as unknown as UserSign);
  } else if (window.location.pathname === '/messenger' && objectData.message) {
    WebSocketControl.send(objectData.message as string);
    await ChatControl.getChats();
  }
  console.log(objectData);
  return true;
}

export function Focus(e: InputEvent): void {
  validator(e.target as HTMLInputElement);
}

export function Blur(e: InputEvent): void {
  validator(e.target as HTMLInputElement);
}

export function Input(e: InputEvent): void {
  validator(e.target as HTMLInputElement);
}

export function openModal(e: Event, classModal: string = '.modal'): void {
  e.preventDefault();
  const modal = document.querySelector(classModal) as HTMLElement;
  modal.classList.add('modal-active');
  modal.addEventListener('click', (event:Event) => {
    const dialog = event.target as HTMLElement;
    if (
      dialog.classList.contains('modal-active')
      || dialog.classList.contains('modal-dialog')
    ) {
      modal.classList.remove('modal-active');
    }
  });
}

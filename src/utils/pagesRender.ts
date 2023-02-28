import Component from '../services/Component';

export default function render(
  query: string,
  component: InstanceType<typeof Component>,
): HTMLElement {
  const root = document.querySelector(query) as HTMLElement;
  root.innerHTML = '';
  root.appendChild(component.getContent());
  component.dispatchComponentDidMount(); // new
  return root;
}

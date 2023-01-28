import Component from '~src/services/Component';

export default function render(
  query: string,
  component: InstanceType<typeof Component>,
): HTMLElement {
  const root = document.querySelector(query) as HTMLElement;
  root.innerHTML = '';
  root.appendChild(component.getContent());
  return root;
}
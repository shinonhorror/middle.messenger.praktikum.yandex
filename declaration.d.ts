declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.hbs' {
  const templates: Function;
  export default templates;
}

declare module '*.png';

declare module 'uuid';

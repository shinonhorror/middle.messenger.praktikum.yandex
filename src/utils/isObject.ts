export default function isObject(value: unknown): value is any {
  return (
    typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
  );
}

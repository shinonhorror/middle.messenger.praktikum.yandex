import { Indexed } from './isEqual';
import isObject from './isObject';
import merge from './merge';

function set(
  object: Indexed | any,
  path: string,
  value: unknown,
): Indexed | any {
  if (typeof path !== 'string') {
    return new Error('path must be string');
  }
  if (!isObject(object)) {
    return object;
  }
  const res = path.split('.').reduceRight((prev, current, index) => {
    if (index === path.split('.').length - 1) {
      return {
        [current]: value,
      };
    }
    return {
      [current]: prev,
    };
  }, {});
  return merge(object, res);
}

export default set;

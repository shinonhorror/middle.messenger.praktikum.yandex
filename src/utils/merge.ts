import { Indexed } from './isEqual';
import isObject from './isObject';

export default function merge(lhs: Indexed, ...rhs: any): Indexed {
  if (!rhs.length) return lhs;
  const source = rhs.shift();
  if (isObject(lhs) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!lhs[key]) {
          Object.assign(lhs, {
            [key]: {},
          });
        }
        merge(lhs[key] as Indexed, source[key]);
      } else {
        Object.assign(lhs, {
          [key]: source[key],
        });
      }
    }
  }
  return merge(lhs, ...rhs);
}

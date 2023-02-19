import isArray from './isArray';
import isObject from './isObject';

export type Indexed<T = unknown> = {
  [k in string]: T;
};

function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isObject(value) || isArray(value);
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of (<any>Object).entries(lhs)) {
    const rightValue = rhs[key] as Indexed;
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value as Indexed, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export type Indexed<T = unknown> = {
  [k in string]: T;
};

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isObject(value: unknown): value is any {
  return (
    typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function merge(lhs: Indexed, ...rhs: any): Indexed {
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

export function trim(str: string, pr?: string): string {
  if (str && !pr) {
    return str.trim();
  }
  return str.replace(new RegExp(`[${pr}]`, 'g'), '');
}

export function set(
  object: Indexed | any,
  path: string,
  value: unknown,
): Indexed | any {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
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

export function objectParams(data: XMLHttpRequestBodyInit, k?: string) {
  const params: [string, string][] = [];
  for (const [key, value] of (<any>Object).entries(data)) {
    if (isObject(value)) {
      if (k) {
        params.push(...objectParams(value, `${k}[${key}]`));
      } else {
        params.push(...objectParams(value, key));
      }
    } else if (k) {
      params.push([`${k}[${key}]`, value]);
    } else {
      params.push([key, value]);
    }
  }
  return params;
}

export function queryStringify(data: XMLHttpRequestBodyInit): string | never {
  if (!isObject(data)) {
    throw new Error('input must be an object');
  }
  const urlParams = objectParams(data)
    .map((item) => item.join('='))
    .join('&');
  return urlParams;
}

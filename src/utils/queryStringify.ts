import isObject from './isObject';

function objectParams(data: XMLHttpRequestBodyInit, k?: string) {
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
function queryStringify(data: XMLHttpRequestBodyInit): string | never {
  if (!objectParams(data)) {
    throw new Error('input must be an object');
  }
  const urlParams = objectParams(data)
    .map((item) => item.join('='))
    .join('&');
  return urlParams;
}

export default queryStringify;

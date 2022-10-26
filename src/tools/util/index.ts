export function omit<T, K extends keyof T>(
  object: T,
  keys: Array<K>
): Pick<T, Exclude<keyof T, K>> {
  const obj = {
    ...object,
  };
  keys.forEach((k) => {
    delete obj[k];
  });
  return obj;
}

export function pick<T extends object, K extends keyof T>(
  object: T,
  keys: Array<K>
): Pick<T, K> {
  const obj: any = {};
  keys.forEach((k) => {
    if (object[k]) {
      obj[k] = object[k];
    }
  });

  return obj;
}

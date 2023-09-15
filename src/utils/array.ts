// ----------------------------------------------------------------------

export function flattenArray<T>(list: T[], key = 'children'): T[] {
  let children: T[] = [];

  const flatten = list?.map((item: any) => {
    if (item[key] && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten?.concat(children.length ? flattenArray(children, key) : children);
}

export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export function getLabelsByValues(array: any, values: any) {
  return values.map((value: any) => {
    const result = array.find((item: any) => item.id === value);
    return result ? result?.details?.name : undefined;
  });
}

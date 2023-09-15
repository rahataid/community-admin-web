export const createQueryString = (
  params: Record<string, string | number | boolean | null | undefined>
) => {
  const queryParams = Object.entries(params)
    .filter(([_, value]) => Boolean(value))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
    .join('&');

  return queryParams === '' ? '' : `${queryParams}`;
};

// ----------------------------------------------------------------------

export function localStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

export function localStorageGetItem(key: string, defaultValue = '') {
  const storageAvailable = localStorageAvailable();

  let value;

  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue;
  }

  return value;
}

export function localStorageSetItem(key: string, value: string) {
  const storageAvailable = localStorageAvailable();

  if (storageAvailable) {
    localStorage.setItem(key, value);
  }
}

export function localStorageRemoveItem(key: string) {
  const storageAvailable = localStorageAvailable();

  if (storageAvailable) {
    localStorage.removeItem(key);
  }
}

export function setToken(value: string): void {
  const v = JSON.stringify(value);
  localStorageSetItem('accessToken', v);
}

export function clearToken(): void {
  localStorageRemoveItem('accessToken');
}

export function getToken(): string | undefined {
  return localStorageGetItem('accessToken');
}

export function setWalletName(value: string): void {
  localStorageSetItem('walletName', value);
}

export function getWalletName(): string | undefined {
  return localStorageGetItem('walletName');
}

export function removeWalletName(): void {
  localStorageRemoveItem('walletName');
}
export function setUser(value: any): void {
  const user = JSON.stringify(value);
  localStorageSetItem('user', user);
}

export function getUser(): any | undefined {
  const user = localStorageGetItem('user');
  return user ? JSON.parse(user) : undefined;
}

export function removeUser(): void {
  localStorageRemoveItem('user');
}

// TypeScript function to get a cookie by name
export function getCookie(name: string): string | null {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';').map(cookie => cookie.trim());

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// TypeScript function to set a cookie
export function setCookie(name: string, value: string, expiresDays: number): void {
  const date = new Date();
  date.setTime(date.getTime() + expiresDays * 24 * 60 * 60 * 1000);

  const expires = `expires=${date.toUTCString()}`;
  const cookieValue = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;

  document.cookie = cookieValue;
}
export function clearCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
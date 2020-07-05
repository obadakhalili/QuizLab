export function findCookie(name) {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  return cookies
    .find(cookie => cookie.startsWith(name))
    ?.slice(name.length + 1);
}

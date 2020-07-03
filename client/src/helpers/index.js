export function isAuth() {
  const tokenChunk = "token-header.payload";
  const cookies = document.cookie.split(";");
  return (
    cookies
      .find(cookie => cookie.startsWith(tokenChunk))
      ?.slice(tokenChunk.length + 1) ?? false
  );
}

exports.setCookies = function([header, payload, signature], res) {
  const pseudorandom = Math.floor(Math.random() * 1000000000);
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token-signature", signature, {
    httpOnly: true,
    sameSite: true,
    secure: isProduction
  });
  res.cookie("token-header.payload", `${header}.${payload}`, {
    sameSite: true,
    secure: isProduction,
    maxAge: 1000 * 60 * 30 // 30 mins
  });
  res.cookie("pseudorandom", pseudorandom, {
    sameSite: true,
    secure: isProduction
  });
};

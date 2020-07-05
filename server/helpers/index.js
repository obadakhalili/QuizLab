const isProduction = process.env.NODE_ENV === "production";

exports.setTokenHeaderAndPayloadCookie = (tokenHeaderAndPayload, res) => {
  res.cookie("token-header.payload", tokenHeaderAndPayload, {
    sameSite: true,
    secure: isProduction,
    maxAge: 1000 * 60 * 30 // 30 mins
  });
};

exports.setPseudorandomAndSignatureCookies = function(signature, res) {
  const pseudorandom = Math.floor(Math.random() * 1000000000);
  res.cookie("pseudorandom", pseudorandom, {
    sameSite: true,
    secure: isProduction
  });
  res.cookie("token-signature", signature, {
    httpOnly: true,
    sameSite: true,
    secure: isProduction
  });
};

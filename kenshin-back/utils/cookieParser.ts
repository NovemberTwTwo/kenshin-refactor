interface parsedCookie {
  [key: string]: string;
}

const cookieParser = (cookies: string): parsedCookie => {
  const output = {};
  try {
    cookies.split(/\s*;\s*/).forEach((cookie: string) => {
      const cookiePair: string[] = cookie.split(/\s*=\s*/);
      output[cookiePair[0]] = cookiePair.splice(1).join('=');
    });
    return output;
  } catch {
    throw new Error('Error while parsing cookie');
  }
};

export default cookieParser;

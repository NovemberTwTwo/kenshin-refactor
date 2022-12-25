import { createHash } from 'crypto';

const randomString = (len = 6): string => {
  let str = '';
  const min = 0;
  const max = 62;
  for (let i = 0; i++ < len; ) {
    let r = (Math.random() * (max - min) + min) << 0;
    str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
  }
  return str;
};

const generateDSToken = (): string => {
  const time: number = Math.floor(Date.now() / 1000);
  const DS_SALT = '6cqshh5dhw73bzxn20oexa9k516chk7s';
  const randomChar = randomString(6);
  const data = `salt=${DS_SALT}&t=${time}&r=${randomChar}`;
  const hash = createHash('md5').update(data).digest('hex');
  return `${time},${randomChar},${hash}`;
};

export default generateDSToken;

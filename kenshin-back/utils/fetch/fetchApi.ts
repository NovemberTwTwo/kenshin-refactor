import axios from 'axios';
import cookieParser from 'utils/cookieParser';
import generateDSToken from 'utils/generateDSToken';

const genshinHeader = axios.create({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    Accept: 'application/json;charset=utf-8',
    Referrer: 'https://webstatic-sea.mihoyo.com/',
    'x-rpc-language': 'ko-kr',
    'x-rpc-client_type': '4', //모바일
    'x-rpc-app_version': '1.5.0',
    DS: generateDSToken(),
  },
});

const getMyGenshinData = async (cookies: string) => {
  const uid = cookieParser(cookies).ltuid;
  genshinHeader.defaults.headers.common['Cookie'] = cookies;
  const data = await genshinHeader
    .get(
      `https://bbs-api-os.mihoyo.com/game_record/card/wapi/getGameRecordCard?uid=${uid}`,
    )
    .then((res) => res.data);
  console.dir(data, { depth: null });
  return data;
};

export default getMyGenshinData;

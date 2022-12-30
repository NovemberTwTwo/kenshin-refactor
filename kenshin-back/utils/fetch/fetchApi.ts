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

interface MyGenshinData {
  retcode: number;
  message: string;
  data: MyData;
}

interface MyData {
  list: Array<MyDataRes>;
}

interface MyDataRes {
  game_role_id: string;
  region: string;
  [key: string]: any;
}

const getMyGenshinData = async (cookies: string) => {
  try {
    const uid = cookieParser(cookies).ltuid;
    genshinHeader.defaults.headers.common['Cookie'] = cookies;
    const data: MyGenshinData = await genshinHeader
      .get(
        `https://bbs-api-os.mihoyo.com/game_record/card/wapi/getGameRecordCard?uid=${uid}`,
      )
      .then((res) => res.data);
    if (data.message !== 'OK') throw new Error('Not Cookie');
    return {
      game_role_id: data.data.list[0].game_role_id,
      region: data.data.list[0].region,
    };
  } catch {
    console.log('Error');
    return new Error('Not a Cookie');
  }
};

const getUserGenshinProfile = async (server: string, gameRoleId: string) => {
  try {
    const data = await genshinHeader
      .get(
        `https://bbs-api-os.mihoyo.com/game_record/genshin/api/index?server=${server}&role_id=${gameRoleId}`,
      )
      .then((res) => res.data);
    return data;
  } catch {
    return;
  }
};

const getMyGenshinNote = async (server: string, gameRoleId: string) => {
  try {
    const data = await genshinHeader
      .get(
        `https://bbs-api-os.mihoyo.com/game_record/genshin/api/dailyNote?server=${server}&role_id=${gameRoleId}`,
      )
      .then((res) => res.data);
    return data;
  } catch {
    return;
  }
};

const getUserGenshinCharacters = async (
  server: string,
  gameRoleId: string,
  avatars: Array<any>,
) => {
  try {
    const data = await genshinHeader
      .post(`https://bbs-api-os.mihoyo.com/game_record/genshin/api/character`, {
        character_ids: avatars.map((character) => character.id),
        role_id: gameRoleId,
        server,
      })
      .then((res) => res.data);
    return data;
  } catch {
    return;
  }
};

const getUserGenshinHandbook = async (gameRoleId: string) => {
  try {
    const data = await genshinHeader
      .get(
        `https://hk4e-api-os.mihoyo.com/event/ysledgeros/month_info?month=0&region=os_asia&uid=${gameRoleId}&lang=ko-kr`,
      )
      .then((res) => res.data);
    return data;
  } catch {
    return;
  }
};

export {
  getMyGenshinData,
  getUserGenshinProfile,
  getMyGenshinNote,
  getUserGenshinCharacters,
  getUserGenshinHandbook,
};

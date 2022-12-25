const getServer = (uid: string): string => {
  const serverList = {
    '6': 'os_usa',
    '7': 'os_euro',
    '8': 'os_asia',
    '9': 'os_cht',
  };
  return serverList[uid[0]];
};

export default getServer;

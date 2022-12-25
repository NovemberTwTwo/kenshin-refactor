import { Injectable } from '@nestjs/common';
import getMyGenshinData from 'utils/fetch/fetchApi';

@Injectable()
export class GenshinService {
  async getMyData() {
    const data = await getMyGenshinData(
      'G_AUTHUSER_H=0; mi18nLang=ko-kr; _MHYUUID=df16efef-bb3a-4522-8b87-afe726ca3502; _gid=GA1.2.1449673640.1672006490; DEVICEFP_SEED_ID=5dd601154cd57cc5; DEVICEFP_SEED_TIME=1672006490347; DEVICEFP=38d7ebb1139c4; ltoken=sRVCjijIC2i8oqXRXmucsOQTqKM6i8CrDWyiF0JF; ltuid=118341597; cookie_token=SEQq3TjIFXJmyxPfPBuweMC6djEwRNdl6W8vTUbh; account_id=118341597; _ga_JRFG0HQ22J=GS1.1.1672006490.1.1.1672006516.0.0.0; G_ENABLED_IDPS=google; _gat_gtag_UA_206868027_11=1; _ga_JTLS2F53NR=GS1.1.1672006549.1.1.1672006561.0.0.0; _ga=GA1.2.533873950.1672006490',
    );
    return data;
  }
}

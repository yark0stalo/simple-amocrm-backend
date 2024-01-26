import * as fs from 'fs';
import * as process from 'process';
import { subdomain } from './subdomain';

export const token = {
  token_type: 'Bearer',
  expires_in: 86400,
  access_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRhMmJmZTI5MWY0OTQxMWY3MjlmZjNlODEwODQ5YzViZWExYzVkZTIyYTliMDliOGJhYWNkZTZmMGIwZmU4ZWM5Y2MxZmFjYTA4ODcyNjViIn0.eyJhdWQiOiI4ZDBjYjA3Zi0yMTVhLTRjMjUtYWE2NC1jNmE3NDBjYWMyNDQiLCJqdGkiOiJkYTJiZmUyOTFmNDk0MTFmNzI5ZmYzZTgxMDg0OWM1YmVhMWM1ZGUyMmE5YjA5YjhiYWFjZGU2ZjBiMGZlOGVjOWNjMWZhY2EwODg3MjY1YiIsImlhdCI6MTcwNTc0MDYyMCwibmJmIjoxNzA1NzQwNjIwLCJleHAiOjE3MDU4MjcwMjAsInN1YiI6IjEwNTQ1Njc0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTA1NTg2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXX0.WTRAkF8Lj3rFdiFYA7zASioY4qz9TpAUSRHEfIafh4l1i-Qw3CyGSWi1x8ZW9JDsNJmr2HI0BYXYvargkZ9iaE2g4EgReEX-Hg5icdqsWZzBIPhufQgRxTEq4kvFOKZIak7YTntGE9T8kEdzi8-M3Ma7J6JRprBPzz587eLG_sBu9lme7EhdxiDGkF9JiIhDQqa01WS5m41fPM4ZKG3v5dV-sK0Vxj0iU8AXTQGmyXEkBRTP4iIaqqkT_SToRaUVE7kj6ade2lyPyseXvoWhBDo6VywcyxSq8v0EHQSDzgW5HaOXvWebST-9Awuqd83-l8LoBOdTbBjbREkek8eH3g',
  refresh_token:
    'def502008a87a9decc5671c6dfc3cfbc7fb0f4392b859df2af5e612a0228d3cdef509a1499b6d426029b47ca40553450cc732089756e19d91814e1ad0b158d83c7a451d60b106cffc046ba712ecfb4ed4c53f3c87a552081913fd0c0733bb85b6eb038d1e060b87f93f2d73053bb0ae0369798ed88bfe2a3a4af02a24d88c9d21a9387837ba0406921ff5e4e824e4e4aab8a82087ddc4c0db6b7d26f9b31a9319531669e53e823f019e8728c2c63041faad87991894ff35447b6e61327a7e96fe0d7399bc41c8683a35ad024885b535c61309e8bf965c509e44033c3e24427baaf0d516082bf2b108ca5323d3677b7b40cdd31d93c68d5d327de024125b0d1fc9807f88a2949effc4f5f52410245cb3fa38d11bcdbd8587cf82f8b1503b5acbc37a0b49b7a808f509d80337b64993fb4c560fc8a69f635950b528c01086b06a22f1d79ed151241e02a6d6c5de7fa7f58a4640e0efada0d639958a15f025392c39a4f12f5f0b5b476743e14a90bcc9e33de92f17db7f358932a4adfb9a9bb81d527341ca42c9785fc90ed4d8608321062f96acb3331e53921904896b808dab2c76c75fdda6d680edd5709aba4c234c7f8f7aac9ed48d5a5718d274f275287ef3efa293da25131e2eba24ce3031ab03b66d8303d2d0eb713c694d782a6028cc22d47ce67109da460a5016588746bc7',
  setValue: function (newToken: {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
  }) {
    this.token_type = newToken.token_type;
    this.expires_in = newToken.expires_in;
    this.access_token = newToken.access_token;
    this.refresh_token = newToken.refresh_token;
  },
};

export const setToken = (newToken: any) => {
  token.token_type = newToken.token_type;
};

export class Token {
  filePath: string = process.cwd() + '/token.json';

  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;

  constructor() {
    this.token_type = '';
    this.expires_in = 0;
    this.access_token = '';
    this.refresh_token = '';
  }

  /**
   * initialize
   */
  public initialize() {
    if (this.tryLoadTokenData()) {
      console.log(this.getTokenData());
      this.refreshedTokenData();
      console.log(this.getTokenData());
    } else {
      this.getAccessWithAuth();
    }
  }
  // USE ONLY FOR FIRST AUTH
  async getAccessWithAuth() {
    await fetch('https://' + subdomain + '.amocrm.ru/oauth2/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: '8d0cb07f-215a-4c25-aa64-c6a740cac244',
        client_secret:
          'hg6rk2sPqEITzIVCcHrXxSlRobS7IPC7HeRP9JOHS7oYgoM9IDXq6gYrdTskmBWU',
        grant_type: 'authorization_code',
        // PASTE 20 MIN CODE TO GET FIRST ACCESS
        code: 'def5020029be910599b6f730a4365bbd37a0a27c86842377dbcb50add24cd933fd67f91f6c24615ac73982bdcbdf7efdc747d625fc114c81a5e1f84bfefcf32a45593d70d37e2bf7f5059c58e20fef412b0ae28a7f1b261fe3834479ad9a06a6134bed128c4ec015641a5303bcc3ae2445f4bda767fa7809fc75b81dd4e2235f8184d01bd3984ab0ebe590d4173009771ad3ec94e60df40cc2ee9bc36f33fef3bc2b6c8286fc094d9e621e9363db1d96b1c8d81648e2deb3ed54f524cf956ccddbd32168de80d3301a198f618ff2b84d00804010186b1a551391b588d14236feab0e4c1aa5d3c25738ab379254a7a8d25929d3180813239f0913c7ed91a250b57675065f77e3a12ac64f5d5a82848b650dde9c4791ab2f64166d04ca1db0c6b7c8370be789f1ad8920663013576bb77fce136173b4e3da7cfae14a48f6f3b932b821537995c82b03eaeaccc57a6aee867f627f1dd709236f4030415bc4129177a951fb32ee0f45d3db5990a0b4a74a2350b7c1afc35aea62e864e206037d25db0ebabf674021f25a7d507cf2cfeb389911af12255329b3213c37d6d714ee08cf5875a1c587b719ec720e60e6f19442da13c3edca514e4e3a9c20cb22d04b8236521b38be34b0d029a63e1652e57d2e338b3a11b7183c57e35905b5f5f9fa',
        redirect_uri: 'https://ya.ru',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setTokenData({
          token_type: data.token_type,
          expires_in: data.expires_in,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
        this.trySaveTokenData();
      })
      .catch((err) => console.log(err));
  }

  async refreshedTokenData() {
    await fetch('https://' + subdomain + '.amocrm.ru/oauth2/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: '8d0cb07f-215a-4c25-aa64-c6a740cac244',
        client_secret:
          'hg6rk2sPqEITzIVCcHrXxSlRobS7IPC7HeRP9JOHS7oYgoM9IDXq6gYrdTskmBWU',
        grant_type: 'refresh_token',
        refresh_token: this.refresh_token,
        redirect_uri: 'https://ya.ru',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setTokenData({
          token_type: data.token_type,
          expires_in: data.expires_in,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
        this.trySaveTokenData();
      })
      .catch((err) => console.log(err));
  }
  /**
   * setTokenData
newToken: {token_type: string, expires_in: number, access_token: string, refresh_token: string, expires_at: number}   */
  setTokenData(newToken: {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
  }): void {
    this.token_type = newToken.token_type;
    this.expires_in = newToken.expires_in;
    this.access_token = newToken.access_token;
    this.refresh_token = newToken.refresh_token;
    token.setValue(newToken);
  }

  getTokenData() {
    return {
      token_type: this.token_type,
      expires_in: this.expires_in,
      access_token: this.access_token,
      refresh_token: this.refresh_token,
    };
  }

  trySaveTokenData(): boolean {
    try {
      const tokenJson = JSON.stringify(this.getTokenData());
      fs.writeFileSync(this.filePath, tokenJson);
      console.log('Token data saved to file');
      return true;
    } catch (error) {
      console.log('Something went wrong on token save:');
      console.log(error);
      return false;
    }
  }
  tryLoadTokenData(): boolean {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      this.setTokenData(JSON.parse(data));
      console.log('Token data loaded from file');
      return true;
    } catch (error) {
      console.log('Something went wrong on token load:');
      console.log(error);
      return false;
    }
  }
}

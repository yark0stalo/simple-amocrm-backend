import { Client } from 'amocrm-js';
import { token } from './token';

export const client = new Client({
  domain: 'yaass61.amocrm.ru',
  auth: {
    client_id: '8d0cb07f-215a-4c25-aa64-c6a740cac244',
    client_secret:
      'hg6rk2sPqEITzIVCcHrXxSlRobS7IPC7HeRP9JOHS7oYgoM9IDXq6gYrdTskmBWU',
    redirect_uri: 'https://ya.ru',
    code: 'def50200f8a320c195ae23b7fbead503c40f9647e5a10beeefe25f67718fa5393d96d41b46d7da533b6936c3d10b86158ee1aff6e911a3e09a4f2de0c01050695d58cb4a377198f57ff8f08f5c1f10ace87445ee39c113115f81924fa6d89fa5ac074d7572f292008db719e7496361b2075a2250ab2a92aa1d6f29bfbc1f0958193ce8034eb4613fcbaf376c9a6cf8ed9331c18ed0103f3c64925472d7e1d19737cdc39681a847f07bed9e2dc79b8c1e4f1901a34f50b36eaa8e0b6eef2d032c0c144ebbcfd3ef495b39097ada848af1f7ec9070943ba70ef5d82cdb8d5e06c98759433520c7250811c92ff00fcd8c03571dd1f876a8921fbe08cc862bcb76108a4c87c03a2231c16f6db6f8ad72fbd42f30634234a093cd5f4193577e1e3e25de44ae3c36bd98028023924e2ac333b39531138d0844db2872683140f1bd61192d213abfcdcf07fa1941b39191e180acd90fc7322271006017644734c30287f3d54e6e3e02c39d179e0afb9e5660ba3397535fd68bbaae45c45d97b7bd1391ab5ddb5a0e8bd09c626b5ea80ff8cc449cc00ea99a783f7fd4e5439ff78849f0fc33cf476c49dfae7db99fba9c4adc8a5df171971645a7b13f16e368073ce55641f2139310e6b899edc3bbd28990e50812787901e876ba826a8e3ed7d00b9a',
  },
});

export async function initializeClient() {
  await client.connection.connect();
  token.setValue(client.token.getValue());
  console.log(token);
}

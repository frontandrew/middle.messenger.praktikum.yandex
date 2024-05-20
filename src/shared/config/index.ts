/* API ENDPOINTS */

import { State } from 'store';

export const REST_API = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES = 'https://ya-praktikum.tech/api/v2/resources';

/* NETWORK */

export const PING_INTERVAL = 180000;

/* APP STATE */

export const INIT_STATE: State = {
  isLoading: false,
  user: null,
  chats: null,
  messages: null,
  chat: null,
};

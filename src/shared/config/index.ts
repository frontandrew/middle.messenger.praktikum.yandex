import { State } from 'store';

/* API ENDPOINTS */

export const REST_HOST = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES = 'https://ya-praktikum.tech/api/v2/resources';

export const WS_HOST = 'wss://ya-praktikum.tech/ws/chats';

/* NETWORK */

export const PING_INTERVAL = 90000;

/* APP STATE */

export const INIT_STATE: State = {
  isLoading: false,
  user: null,
  chats: null,
  messages: [],
  chat: null,
};

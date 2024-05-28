import { store } from 'store';

export function updeteChatsList(nextId: number, currId: number | null) {
  const chats = store.get()?.chats;
    chats![nextId].isCurrent = true;
    if (currId) chats![currId].isCurrent = false;

    store.set(`chats`, chats);
}

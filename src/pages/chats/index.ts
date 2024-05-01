import {
  Avatar, Avatar1, Avatar2, Avatar3, Content1, Content2,
} from 'images';
import { LayoutChats } from './components';

import type { LayoutChatsProps as PageChatsContext } from './components';

const data: PageChatsContext = {
  user: {
    id: 23,
    image: Avatar,
    email: 'some@email.com',
    login: 'devostator777',
    firstName: 'John',
    secondName: 'Doe',
    nickName: 'Devostator',
    phone: '+66 45 955 12 12',
  },
  chats: [
    {
      id: 12043,
      name: 'John Doe',
      avatar: Avatar3,
      lastMessage: 'Чекаво, Вася?!',
      date: 'Su',
      count: 2,
    },
    {
      id: 57877,
      name: 'Kate Smith',
    },
    {
      id: 67356,
      name: 'Kornelius Disappointovichev',
      avatar: Avatar1,
      lastMessage: 'Lorem, quas ab similique quia pere culpa kufnsk su veniam accusantium.',
      date: '29 Feb 2023',
      count: 9,
    },
    {
      id: 96756,
      name: 'Devostator',
      lastMessage: 'Lorem, quas ab similique quia pere culpa kufnsk',
      date: '02:59',
      count: 12,
    },
    {
      id: 38135,
      name: 'Jack Black',
      avatar: Avatar2,
      lastMessage: 'Аллё, на! Вашей тёще зять ненужен?',
      date: '09 Dec',
      count: 45,
    },
  ],
  messages: [
    {
      id: 12,
      content: '17 April',
      type: 'text',
      origin: 'system',
    },
    {
      id: 13,
      userId: 5264,
      date: '06:00',
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Vel ea at doloribus mollitia adipisci suscipit quisquam
                  exercitationem et, tenetur inventore tempore tempora doloremque
                  accusamus rerum consequatur ratione voluptate provident assumenda.`,
      type: 'text',
      origin: 'incoming',
    },
    {
      id: 14,
      userId: 1342,
      date: '07:41',
      content: Content1,
      type: 'media',
      origin: 'incoming',
    },
    {
      id: 15,
      userId: 9365,
      date: '13:54',
      content: 'Шалом, православные!',
      type: 'text',
      origin: 'outgoing',
    },
    {
      id: 16,
      userId: 737,
      date: '17:22',
      content: Content2,
      type: 'media',
      origin: 'outgoing',
    },
    {
      id: 17,
      userId: 58,
      date: '23:09',
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ea at doloribus
               mollitia adipisci suscipit quisquam exercitationem et, tenetur inventore!`,
      type: 'text',
      origin: 'outgoing',
    },
  ],
};

export class PageChats extends LayoutChats {
  constructor() {
    super(data);
  }
}

export type { PageChatsContext };

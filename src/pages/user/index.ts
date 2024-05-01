import { Avatar } from 'images';
import { LayoutUser } from './components';

import type { LayoutUserArgs } from './components/layout-user/type';
import type { FormInfoData as PageUserContext } from './components/form-info/type';

const image = Avatar;
const data = {
  email: 'some@email.com',
  login: 'devostator777',
  firstName: 'John',
  secondName: 'Doe',
  nickName: 'Devostator',
  phone: '+66 45 955 12 12',
};

export class PageUser extends LayoutUser {
  constructor() {
    super({ image, data } as LayoutUserArgs);
  }
}

export type { PageUserContext };

import { router } from 'routing';
import { store } from 'store';

import { RegAPI } from '../components/form-reg/api';

import type { FormRegData } from '../components/form-reg/type';
import type { RegPayload } from '../components/form-reg/api';

export class RegController {
  private api = new RegAPI();

  public async regUser(data: FormRegData) {
    store.set('isLoading', true);

    const isRegistered = await this.api
      .registration(this.formatRegUserPayload(data))
      .then(({ response }) => Boolean(response.id))
      .catch(() => false);
    if (isRegistered) {
      router.go('/');
    }

    store.set('isLoading', false);
  }

  private formatRegUserPayload(data: FormRegData): RegPayload {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { firstName, passwordMore, secondName, phone, ...rest } = data;
    return {
      first_name: firstName,
      second_name: secondName,
      phone: phone.split(' ').join(''),
      ...rest,
    };
  }
}

/*
const user1 = {
  email: 'jackblack@email.com',
  login: 'JackBlack',
  firstName: 'Jack',
  secondName: 'Black',
  phone: '+7 999 999 99 99',
  password: '1!Qwerty',
  passwordMore: '1!Qwerty',
};
*/

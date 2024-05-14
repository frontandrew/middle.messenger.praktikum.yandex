import { store } from 'store';

import { RegAPI } from '../components/form-reg/api';

import type { FormRegData } from '../components/form-reg/type';
import type { RegPayload } from '../components/form-reg/api';

export class RegController {
  private api = new RegAPI();

  public async regUser(data: FormRegData) {
    const payload = this.formatData(data);

    const isRegistered = await this.api.registration(payload)
      .then(({ response }) => Boolean(response.id))
      .catch(() => false)
      .finally(() => {
        store.set('isLoading', false);
      });

    store.set('isLoading', true);
    return isRegistered;
  }

  formatData(data: FormRegData): RegPayload {
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

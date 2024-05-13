import { store } from 'store';
import { RegAPI } from '../components/form-reg/api';
import type { RegPayload } from '../components/form-reg/api';

import type { FormRegData } from '../components/form-reg/type';

export class RegController {
  // private api = new RegAPI();

  public async regUser(data: FormRegData) {
    // console.log(`REG USER CALL:`, data);
    // const payload = this.formatData(data);

    // const isRegistered = await this.api.registration(payload)
    //   .then(({ response }) => Boolean(response.id))
    //   .catch(() => false);

    store.set('isLoading', true);

    const isRegistered = await new Promise((resolve) => {
      // console.log(`REG USER REQUEST:`, data);
      setTimeout(() => resolve('done!'), 2000);
    })
      .then(() => true)
      .finally(() => {
        store.set('isLoading', false);
      });
    // console.log(`REG USER CALL IS REG:`, isRegistered);
    return isRegistered;
  }

  formatData(data: FormRegData): RegPayload {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { firstName, passwordMore, secondName, ...rest } = data;
    return { first_name: firstName, second_name: secondName, ...rest };
  }
}

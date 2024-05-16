import { UserController } from 'entities';
import { router } from 'routing';
import { store } from 'store';

const userConttoller = new UserController();

export class AppController {
  /* IMPORTANT: router and store mus be init before setAuthState() call */
  async setAuthState() {
    const user = await userConttoller.getUser();
    store.set('user', user);
    if (store.get()?.user?.id) {
      router.authState = true;
    }
  }

  async start() {
    store.set('isLoading', true);
    await this.setAuthState();
    if (!router.authState) {
      router.go('/');
    }
    store.set('isLoading', false);
  }
}

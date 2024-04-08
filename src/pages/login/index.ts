import { LayoutAuth } from './components';

export class PageLogin extends LayoutAuth {
  constructor({ login = '', password = '', ...rest }: { login?: string, password?: string }) {
    super({ data: { login, password }, ...rest });
  }
}

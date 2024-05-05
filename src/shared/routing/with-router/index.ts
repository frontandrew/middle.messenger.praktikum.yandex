import { Router } from 'routing';

export function withRouter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends { new(...args: any[]): Record<string, any> }>(constructor: T) {
  return class extends constructor {
    public router: Router = new Router();
  };
}
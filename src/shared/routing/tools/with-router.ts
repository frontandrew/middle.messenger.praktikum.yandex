import { Component } from 'core';

import { router } from '../router';

export function withRouter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends { new(...args: any[]): InstanceType<typeof Component> }>(constructor: T) {
  return class extends constructor {
    public router = router;
  };
}

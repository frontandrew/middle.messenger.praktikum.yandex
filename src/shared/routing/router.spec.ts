import { expect, describe, test, beforeAll } from 'vitest';
import { Children, Component, Props } from 'core';

import { router } from './router';
import { Route } from './route';

describe('Instance of Router', async () => {
  class PageStub extends Component<Children, Props> {
    constructor() {
      super({});
    }

    render() {
      return '';
    }

    hide() {}
    show() {}
  }

  const testRoutsConfig = {
    root: { pathname: '/', component: PageStub, needAuth: false },
    withOutAuth: { pathname: '/sign-up', component: PageStub, needAuth: false },
    withAuth: { pathname: '/messanger', component: PageStub, needAuth: true },
  };

  Object.values(testRoutsConfig).forEach((conf) => {
    router.use(conf);
  });

  describe('on "use()" call should', () => {
    test(`create exactly ${Object.values(testRoutsConfig).length} routes`, () => {
      expect(router.routes).toHaveLength(Object.values(testRoutsConfig).length);
    });

    test('create instances of Route', () => {
      router.routes.forEach((route) => {
        expect(route).toBeInstanceOf(Route);
      });
    });

    test('create route with passed pathnames', () => {
      router.routes.forEach((route, index) => {
        expect(route).toHaveProperty('pathname', Object.values(testRoutsConfig)[index].pathname);
      });
    });
  });

  describe('on "start()" call should', () => {
    beforeAll(() => {
      router.start();
    });

    test('matching location.pathname with root route', () => {
      expect(router.routes.some((route) => route.match(testRoutsConfig.root.pathname))).toBe(true);
    });

    test('matching existing route path name with location.pathname', () => {
      expect(router.routes.some((route) => route.match(window.location.pathname))).toBe(true);
    });
  });

  describe('on "go()" call (authState = false)', () => {
    describe(`with route witch not expect authorization should`, () => {
      const nextPathname = testRoutsConfig.withOutAuth.pathname;
      beforeAll(() => {
        router.go(nextPathname);
      });

      test('matching existing route path name with location.pathname', () => {
        expect(router.routes.some((route) => route.match(window.location.pathname))).toBe(true);
      });

      test('matching location.pathname with passed pathname', () => {
        expect(window.location.pathname).toEqual(nextPathname);
      });
    });

    describe(`with route witch expect authorization should`, () => {
      const nextPathname = testRoutsConfig.withAuth.pathname;
      beforeAll(() => {
        router.go(nextPathname);
      });

      test('matching existing route path name with location.pathname', () => {
        expect(router.routes.some((route) => route.match(window.location.pathname))).toBe(true);
      });

      test('matching location.pathname with root pathname', () => {
        expect(window.location.pathname).toEqual(testRoutsConfig.root.pathname);
      });
    });
  });

  describe('on "back()" call', () => {
    describe(`with route witch not expect authorization should`, () => {
      const targetPathname = testRoutsConfig.withOutAuth.pathname;

      beforeAll(() => {
        router.go('/');
        router.go(targetPathname);
        router.back();
      });

      test('matching location.pathname with passed pathname', () => {
        expect(window.location.pathname).toEqual(targetPathname);
      });
    });

    describe(`with route witch expect authorization should`, () => {
      const targetPathname = testRoutsConfig.withAuth.pathname;

      beforeAll(() => {
        router.go(targetPathname);
        router.back();
      });

      test('matching location.pathname with root pathname', () => {
        expect(window.location.pathname).toEqual(testRoutsConfig.root.pathname);
      });
    });
  });

  describe('on "forward()" call', () => {
    describe(`with route witch not expect authorization should`, () => {
      const targetPathname = testRoutsConfig.withOutAuth.pathname;

      beforeAll(() => {
        router.go(targetPathname);
        router.back();
        router.forward();
      });

      test('matching location.pathname with passed pathname', () => {
        expect(window.location.pathname).toEqual(targetPathname);
      });
    });

    describe(`with route witch expect authorization should`, () => {
      const targetPathname = testRoutsConfig.withAuth.pathname;

      beforeAll(() => {
        router.go(targetPathname);
        router.back();
        router.forward();
      });

      test('matching location.pathname with root pathname', () => {
        expect(window.location.pathname).toEqual(testRoutsConfig.root.pathname);
      });
    });
  });
});

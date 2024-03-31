import { Avatar, Button, Field, Form, Text } from 'ui';

import { FormUser, Layout } from './components';

import type { PageUserArgs } from './type';

export class PageUser extends Layout {
  constructor(args: PageUserArgs) {
    super({
      avatar: new Avatar({}),
      title: new Text({
        text: args.nick_name,
      }),
      form: new FormUser({}),
      // side: new SidePanel({
      //   redirect: new Button({})
      // })
    });
  }
}

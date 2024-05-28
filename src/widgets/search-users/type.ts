import type { Children, Props } from 'core';
import type { FormSearch, ListUsers } from 'features';
import type { Button, Text } from 'ui';

export interface SearchUsersChildren extends Children{
  form: FormSearch;
  list: ListUsers;
  action: Button;
  message: Text;
}

export interface SearchUsersProps extends Props {}

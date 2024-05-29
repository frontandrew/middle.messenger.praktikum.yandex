import { ChatUserType } from 'apis/chat';
import type { Children, Props } from 'core';
import { UserType } from 'entities/user';
import type { FormSearch, ListUsers } from 'features';
import type { Button, Text } from 'ui';

export interface SearchUsersChildren extends Children{
  form: FormSearch;
  list: ListUsers;
  action: Button;
  message: Text;
}

export interface SearchUsersProps extends Props {
  hasntUsers?: boolean;
  submitHandler: (ids: number[]) => Promise<boolean> | null;
  searchHandler: (search: string) => Promise<UserType[] | ChatUserType[]> | null;

}

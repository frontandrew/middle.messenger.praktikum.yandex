import { Avatar } from './avatar';
import { Button } from './button';
import { Field } from './field';
import { Form } from './form';
import { Input } from './input';
import { List } from './list';
import { Text } from './text';

// Этот тип скорее всего не нужен, эксперимент

export type ComponentsType = typeof Avatar
  | typeof Button
  | typeof Field
  | typeof Form
  | typeof Input
  | typeof List
  | typeof Text
  | typeof undefined

export { Avatar } from './avatar';
export { Button } from './button';
export { Field } from './field';
export { Form } from './form';
export { Input } from './input';
export { List } from './list';
export { Text } from './text';

export * as Templates from './templates';

export type { AvatarArgs, AvatarChildren, AvatarProps } from './avatar/type';
export type { ButtonArgs, ButtonChildren, ButtonProps } from './button/type';
export type {
  FormArgument, FormArgs, FormChildren, FormData, FormEvent, FormProps,
} from './form/type';
export type { FieldArgs, FieldChildren, FieldProps } from './field/type';
export type { InputArgs, InputChildren, InputProps } from './input/type';
export type { ListArgs, ListChildren, ListProps } from './list/type';
export type { TextArgs, TextChildren, TextProps } from './text/type';

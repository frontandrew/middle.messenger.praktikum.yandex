// import { Avatar } from './avatar';
// import { Button } from './button';
// import { ButtonIcon } from './button-icon';
// import { Dialog } from './dialog';
// import { Field } from './field';
// import { Form } from './form';
// import { Input } from './input';
// import { InputField } from './input-field';
// import { InputFile } from './input-file';
// import { Text } from './text';

// // Этот тип скорее всего не нужен, эксперимент

// export type ComponentsType = typeof Avatar
//   | typeof Button
//   | typeof ButtonIcon
//   | typeof Dialog
//   | typeof Field
//   | typeof Form
//   | typeof Input
//   | typeof InputFile
//   | typeof InputField
//   | typeof Text
//   | typeof undefined

export { Avatar } from './avatar';
export { Button } from './button';
export { ButtonIcon } from './button-icon';
export { Dialog } from './dialog';
export { Field } from './field';
export { Form } from './form';
export { Input } from './input';
export { InputFile } from './input-file';
export { InputField } from './input-field';
export { Menu } from './menu';
export { MenuItem } from './menu-item';
export { Text } from './text';

export * as Templates from './templates';

export type { AvatarArgs, AvatarChildren, AvatarProps } from './avatar/type';
export type { ButtonTypes, ButtonChildren, ButtonProps } from './button/type';
export type { ButtonIconChildren, ButtonIconProps } from './button-icon/type';
export type { DialogArgs, DialogChildren, DialogProps } from './dialog/type';
export type { FormArgs, FormChildren, FormData, FormProps } from './form/type';
export type { FieldArgs, FieldChildren, FieldProps } from './field/type';
export type { InputChildren, InputProps, InputType } from './input';
export type { InputFieldChildren, InputFieldProps } from './input-field';
export type { InputFileChildren, InputFileProps } from './input-file';
export type { MenuChildren, MenuProps } from './menu';
export type { MenuItemChildren, MenuItemProps } from './menu-item';
export type { TextProps } from './text/type';

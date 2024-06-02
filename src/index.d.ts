/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.hbs' {
  const src: string;
  export default src;
}

declare type Nullable<T> = T | null
declare type UnknownObject = Record<string, unknown>
declare type MakeOptional<T> = { [P in keyof T]+?: T[P] }
declare type PlainObject<T = any> = { [key in string]: T };

declare module '*.hbs' {
  const src: string;
  export default src;
}

declare type Nullable<T> = T | null
declare type UnknownObject = Record<string, unknown>

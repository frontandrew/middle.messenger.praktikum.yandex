export type ValidatorParams = {
  value: string,
  required?: boolean,
}

export type ValidationState = {
  textError: string,
  hasError: boolean,
  value: string,
}

export type Validators = Record<string, ({}: ValidatorParams) => ValidationState>

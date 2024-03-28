import type { ValidationState, ValidatorParams } from 'tools';
import { Component } from 'core';

export interface FieldArgs {
  name: string,
  label: string,
  type: 'text' | 'password',

  class?: string,
  disabled?: boolean,
  hasError?: boolean,
  textError?: string,
  textHelp?: string,
  touched?: boolean,
  required?: boolean,
  value?: string,
  validator?: ({}: ValidatorParams) => ValidationState,

  onChange?: ({}: InputEvent) => Event
  onInput?: ({}: InputEvent) => Event

  input?: Component
}

export interface FieldProps {
  readonly name: string,
  readonly label: string,
  type: 'text' | 'password',

  class: string,
  disabled: boolean,
  hasError: boolean,
  textError: string,
  textHelp: string,
  touched: boolean,
  required: boolean,
  value: string,
  validator: ({}: ValidatorParams) => ValidationState,

  onChange: ({}: InputEvent) => Event
  onInput: ({}: InputEvent) => Event
}

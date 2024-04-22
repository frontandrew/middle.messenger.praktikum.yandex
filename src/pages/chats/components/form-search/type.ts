import type { Field, FormChildren, FormProps } from 'ui';

export interface FormSearchProps extends FormProps{
  search?: string,
  lens: string,
}

export interface FormSearchChildren extends FormChildren {
  fieldSearch: Field,
}

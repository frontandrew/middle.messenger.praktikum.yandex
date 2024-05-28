import type { Field, FormChildren, FormProps } from 'ui';

export interface FormSearchProps extends FormProps {
  img?: string;
  fieldName?: string,
  value?: string;
}

export interface FormSearchChildren extends FormChildren {
  search: Field;
}

import type { Field, FormChildren, FormProps } from 'ui';

export interface FormSearchProps extends FormProps{
  searchValue?: string;
  img?: string;
  autofocus?: boolean;
  tabindex?: number;
}

export interface FormSearchChildren extends FormChildren {
  search: Field;
}

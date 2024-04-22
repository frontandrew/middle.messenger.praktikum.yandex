import { Field, Form } from 'ui';
import { Lens } from 'images';

import type { FormSearchChildren, FormSearchProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class FormSearch extends Form<FormSearchChildren, FormSearchProps> {
  constructor({ search = '' }: FormSearchProps) {
    super({
      lens: Lens,
      fieldSearch: new Field({
        type: 'simple',
        value: search,
        name: 'search',
        placeholder: 'Search',
        classes: 'form-search__field',
      }),
    } as FormSearchChildren & FormSearchProps);
  }

  render(): string {
    return template;
  }
}

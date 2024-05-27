import { Field, Form } from 'ui';
import { Lens } from 'images';

import type { FormSearchChildren, FormSearchProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class FormSearch extends Form<FormSearchChildren, FormSearchProps> {
  constructor() {
    super({
      img: Lens,
      fieldSearch: new Field({
        type: 'simple',
        name: 'search',
        placeholder: 'Search',
        classes: 'form-search__field',
      }),
      onSubmit: (event) => {
        event.preventDefault();
        this.handleSearchSubmit();
        return event;
      },
    } as FormSearchChildren & FormSearchProps);
  }

  handleSearchSubmit() {
    if (!this.children.fieldSearch.value) return;
    this.handleSubmit();
  }

  render(): string {
    return template;
  }
}

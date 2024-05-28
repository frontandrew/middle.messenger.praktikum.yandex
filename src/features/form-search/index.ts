import { Field, Form } from 'ui';
import { Lens } from 'images';

import type { FormSearchChildren, FormSearchProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class FormSearch extends Form<FormSearchChildren, FormSearchProps> {
  constructor({
    onSubmit = (event) => {
      event.preventDefault();
      this.handleSearchSubmit();
      return event;
    },

    img = Lens,
    fieldName = 'search-field',
    ...props
  }: FormSearchProps) {
    super({
      img,
      fieldName,
      onSubmit,

      search: new Field({
        name: fieldName,
        type: 'simple',
        placeholder: 'Search',
        classes: 'form-search__field',
        ...props,
      }),
    } as FormSearchChildren & FormSearchProps);

    if (this.props.searchValue) this.handleSearchSubmit();
  }

  handleSearchSubmit() {
    if (!this.children.search.value) return;
    this.handleSubmit();
  }

  render(): string {
    return template;
  }
}

import { Field, Form } from 'ui';
import { Lens } from 'images';

import type { FormSearchChildren, FormSearchProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class FormSearch extends Form<FormSearchChildren, FormSearchProps> {
  constructor(props?: FormSearchProps) {
    super({
      img: Lens,
      search: new Field({
        type: 'simple',
        name: 'search',
        placeholder: 'Search',
        classes: 'form-search__field',
        autofocus: props?.autofocus,
        tabindex: props?.tabindex,
        value: props?.searchValue,
      }),
      onSubmit: (event) => {
        event.preventDefault();
        this.handleSearchSubmit();
        return event;
      },
      ...props,
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

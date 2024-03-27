import { Form } from 'ui';

import template from './template.hbs?raw';
import './style.css';

export class FormAuth extends Form {
  render() {
    return template;
  }
}

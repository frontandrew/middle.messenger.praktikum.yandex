import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('FieldsContainer', template)

export class FieldsContainer extends Component {
    constructor(props = {}) {
        super(props);
    }

    render() {
        return template
    }
};

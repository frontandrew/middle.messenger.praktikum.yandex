import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('ActionsContainer', template)

export class ActionsContainer extends Component {
    constructor(props = {}) {
        super(props);
    }

    render() {
        return template
    }
};

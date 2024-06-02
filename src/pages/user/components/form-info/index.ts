import { Button, Field, FieldChildren, FieldProps, Form } from 'ui';
import { withStore } from 'store';

import type { FormInfoChildren, FormInfoData, FormInfoProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { FormInfoChildren, FormInfoProps, FormInfoData };

export class FormInfo extends Form<FormInfoChildren, FormInfoProps> {
  constructor({ isEdit, onSubmit }: FormInfoProps) {
    const fieldsProps = {
      email: {
        name: 'email',
        type: 'text',
        label: 'Email',
        inline: true,
        disabled: true,
        autofocus: true,
        tabindex: 1,
      },
      login: {
        name: 'login',
        type: 'text',
        label: 'Login',
        inline: true,
        disabled: true,
        tabindex: 2,
      },
      firstName: {
        name: 'first_name',
        type: 'text',
        label: 'Name',
        inline: true,
        disabled: true,
        tabindex: 3,
      },
      secondName: {
        name: 'second_name',
        type: 'text',
        label: 'Surname',
        inline: true,
        disabled: true,
        tabindex: 4,
      },
      nickName: {
        name: 'display_name',
        type: 'text',
        label: 'Nickname',
        inline: true,
        disabled: true,
        tabindex: 5,
      },
      phone: {
        name: 'phone',
        type: 'text',
        label: 'Phone',
        inline: true,
        disabled: true,
        tabindex: 6,
      },
    };

    const fieldComponentsWithState = Object
      .entries(fieldsProps)
      .reduce((components, [key, props]) => {
        const FieldWithState = withStore<FieldChildren, FieldProps>(
          (state) => ({ value: state?.user?.[key as keyof typeof fieldsProps] ?? '' }),
        )(Field);

        return ({ ...components, [key]: new FieldWithState(props as FieldProps) });
      }, {});

    super({
      isEdit: isEdit ?? false,
      onSubmit,

      ...fieldComponentsWithState,
      submit: new Button({
        label: 'Save',
        type: 'submit',
        tabindex: 7,
      }),
    } as FormInfoChildren & FormInfoProps);
  }

  setEditMode(mode: boolean) {
    this.setProps({ isEdit: mode });

    Object.values(this.children).forEach((child) => {
      if (child instanceof Field) {
        child.setDisabledState(!this.props.isEdit);
      }
    });
  }

  render() {
    return template;
  }
}

import { Button, Field, Form } from 'ui';
import { withRouter } from 'routing';
import { withStore } from 'store';

import { RegController } from '../../controller';

import type { FormRegChildren, FormRegData, FormRegProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { FormRegChildren, FormRegData, FormRegProps };

const FormWithStore = withStore((state) => ({ data: state.regData }))(withRouter(Form));

// const data = {
//   email: 'jackblack@email.com',
//   login: 'JackBlack',
//   firstName: 'Jack',
//   secondName: 'Black',
//   phone: '+9 999 999 99 99',
//   password: '1!Qwerty',
//   passwordMore: '1!Qwerty',
// };

export class FormReg extends FormWithStore<FormRegChildren, FormRegProps> {
  private controller = new RegController();
  constructor() {
    super({
      // data: {},
      onSubmit: (event: Event) => {
        event.preventDefault();
        this.handleRegistration();
        return event;
      },

      email: new Field({
        name: 'email',
        type: 'text',
        label: 'Email',
        required: true,
      }),
      login: new Field({
        name: 'login',
        type: 'text',
        label: 'Login',
        textHelp: 'Only letters and numbers accepted.',
        required: true,
      }),
      firstName: new Field({
        name: 'first_name',
        type: 'text',
        label: 'Name',
        required: true,
      }),
      secondName: new Field({
        name: 'second_name',
        type: 'text',
        label: 'Surname',
        required: true,
      }),
      phone: new Field({
        name: 'phone',
        type: 'text',
        label: 'Phone',
        required: true,
      }),
      password: new Field({
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
      }),
      passwordMore: new Field({
        name: 'password_more',
        type: 'password',
        label: 'Repeat password',
        required: true,
      }),
      submit: new Button({
        label: 'Register',
        type: 'submit',
      }),
    } as FormRegChildren & FormRegProps);
  }

  async handleRegistration(): Promise<void> {
    const regData = this.handleSubmit() as FormRegData;
    // console.log(`FORMREG DATA:`, regData);
    if (regData) {
      this.validatePasswordRepeate(regData);
    }
    if (!this.props.hasError) {
      const isRegistered = await this.controller.regUser(regData);
      // console.log(`IS REGISTR:`, isRegistered);

      if (isRegistered) {
        this.router.go('/');
      }
    }
  }

  validatePasswordRepeate(data: FormRegData) {
    if (data.passwordMore !== data.password) {
      this.children.passwordMore.setProps({ hasError: true, textError: `Passwords don't match` });
      this.setProps({ hasError: true });
    }

    this.updateErrorState(this.props.hasError!);
  }

  render() {
    return template;
  }
}

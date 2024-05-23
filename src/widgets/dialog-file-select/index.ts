import { Dialog } from 'ui';
import { isPlainObject } from 'tools';

import { FormAvatar } from 'features/form-avatar';
import { usersController as ctrl } from 'services/users';

import type { DialogFileSelectChildren, DialogFileSelectProps } from './type';

export class DialogSelectFile extends Dialog<DialogFileSelectChildren, DialogFileSelectProps> {
  constructor({ isOpen = false, ...rest }: DialogFileSelectProps) {
    super({
      content: new FormAvatar({
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          this.handleFileSubmit();
          return event;
        },
      }),
      isOpen,
      ...rest,
    } as DialogFileSelectChildren & DialogFileSelectProps);
  }
  private async handleFileSubmit(): Promise<void> {
    const data = this.children.content.handleSubmit();
    if (!isPlainObject(data)) return;

    const result = await ctrl.updateAvatar(data);
    if (!result) {
      this.children.content.setProps({ hasError: true });
    }
    this.setProps({ isOpen: false });
  }
}

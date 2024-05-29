import { Dialog } from 'ui';

import { FormFile } from 'features/form-file';
// import { usersServ } from 'services/users';

import type { DialogFileSelectChildren, DialogFileSelectProps } from './type';

export class DialogSelectFile extends Dialog<DialogFileSelectChildren, DialogFileSelectProps> {
  constructor(props?: DialogFileSelectProps) {
    super({
      fileSubmitHandler: null,
      content: new FormFile({
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          this.handleFileSubmit();
          return event;
        },
      }),
      ...props,
    } as DialogFileSelectChildren & DialogFileSelectProps);
  }
  private async handleFileSubmit(): Promise<void> {
    const data = this.children.content.handleSubmit();
    if (!(data?.file instanceof File) || !this.props.fileSubmitHandler) return;

    const result = await this.props.fileSubmitHandler(data.file);
    if (!result) {
      this.children.content.setProps({ hasError: true });
    }
    this.setProps({ isOpen: false });
  }
}

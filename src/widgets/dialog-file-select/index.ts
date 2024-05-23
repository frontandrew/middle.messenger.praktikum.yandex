import { Dialog } from 'ui';
import { FormAvatar } from 'features/form-avatar';

import type { DialogFileSelectChildren, DialogFileSelectProps } from './type';

export class DialogSelectFile extends Dialog<DialogFileSelectChildren, DialogFileSelectProps> {
  constructor(props: DialogFileSelectProps) {
    super({
      content: new FormAvatar(),
      ...props,
    } as DialogFileSelectChildren & DialogFileSelectProps);
  }
}

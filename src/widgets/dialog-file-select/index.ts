import { Dialog } from 'ui';
import { FormAvatar } from 'features/form-avatar';

import type { DialogFileSelectChildren, DialogFileSelectProps } from './type';

export class DialogSelectFile extends Dialog<DialogFileSelectChildren, DialogFileSelectProps> {
  constructor({ isOpen = false, ...rest }: DialogFileSelectProps) {
    super({
      content: new FormAvatar(),
      isOpen,
      ...rest,
    } as DialogFileSelectChildren & DialogFileSelectProps);
  }
}

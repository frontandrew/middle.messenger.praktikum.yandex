import { DialogChildren, DialogProps } from 'ui';
import { FormFile } from 'features';

export interface DialogFileSelectChildren extends DialogChildren {
  content: FormFile;
}

export interface DialogFileSelectProps extends DialogProps {
  fileSubmitHandler?: (file: File) => Promise<boolean>;
}

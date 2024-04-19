import { Input, Text } from 'ui';

import type { InputChildren, InputProps } from 'ui';

type InputFileAcceptTypes = 'image/*' | 'video/*';

export interface InputFileArgs extends InputFileProps, InputFileChildren {}

export interface InputFileProps extends InputProps {
  label?: string,
  accept?: InputFileAcceptTypes,
}

export interface InputFileChildren extends InputChildren {
  input: Input<InputChildren, InputProps>,
  fileName: Text,
  labelText: Text,
}

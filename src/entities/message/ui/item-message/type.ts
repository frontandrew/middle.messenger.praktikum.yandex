import type { Children, Props } from 'core';

import type { MessageType } from 'entities/message';

export interface ItemMessageChildren extends Children {}

export interface ItemMessageProps extends MessageType, Props {
  isMediaType: boolean,
}

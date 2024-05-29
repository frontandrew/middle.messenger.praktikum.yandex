import { MessageResponse } from '../type';

export function sortMssgsByData(mssgs: MessageResponse[]): MessageResponse[] {
  return mssgs.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
}

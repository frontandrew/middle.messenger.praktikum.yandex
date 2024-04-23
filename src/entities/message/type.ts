export interface MessageType {
  id: number,
  type: 'system' | 'user',
  origin: 'incoming' | 'outgoing',

  text?: string | null,
  media?: string | null,
  userId?: number,
  date?: string,
}

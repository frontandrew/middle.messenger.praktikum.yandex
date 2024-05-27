import type { UserPassPayload } from 'apis/user';
import type { PassUserType } from 'entities/user';

export function formatUserPassPayload(user: PassUserType): UserPassPayload {
  const { passCurr, passNew } = user;
  return { newPassword: passNew, oldPassword: passCurr };
}

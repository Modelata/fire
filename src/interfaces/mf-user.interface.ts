/**
 * Interface that a user model MUST implement in order to be sync-able with auth user
 */
export interface IMFUserInterface {
  email?: string;
  phoneNumber?: string;
  photoUrl?: string;
}

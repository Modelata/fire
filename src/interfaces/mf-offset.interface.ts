import { DocumentData, DocumentSnapshot } from '../specifics/exports';

/**
 * Offset option value, only one is handled
 */
export interface IMFOffset<M extends DocumentData> {
  /**
   * First element of the list
   */
  startAt?: string | DocumentSnapshot<M>;

  /**
   * last element before the list
   */
  startAfter?: string | DocumentSnapshot<M>;

  /**
   * Last element of the list
   */
  endAt?: string | DocumentSnapshot<M>;

  /**
   * first element after the list
   */
  endBefore?: string | DocumentSnapshot<M>;
}

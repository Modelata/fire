import { IMFLocation } from './mf-location.interface';
import { DocumentSnapshot } from '../specifics/exports';

export interface IMFModel<M> {
  /**
   * Document Id
   */
  _id: string;

  /**
   * Collection path (without id)
   */
  _collectionPath: string;

  /**
   * Document snapshot if asked in options
   */
  _snapshot: DocumentSnapshot<M>;

  /**
   * Date of creation of the document
   */
  creationDate: Date;

  /**
   * Date of last update of the document
   */
  updateDate: Date;

  /**
   * initializes the instance of the model with the given data and location
   *
   * @param data the data to inject in the instance
   * @param mustachePath the mustache path of the collection
   * @param location document id and identifiers to set in mustache path
   */
  initialize(data: Partial<M>, mustachePath?: string, location?: Partial<IMFLocation>): void;
}

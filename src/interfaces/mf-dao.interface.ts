import { AsyncType, CollectionReference, DocumentReference, DocumentSnapshot } from '../specifics/exports';
import { IMFFile } from './mf-file.interface';
import { IMFGetListOptions } from './mf-get-list-options.interface';
import { IMFGetOneOptions } from './mf-get-one-options.interface';
import { IMFLocation } from './mf-location.interface';
import { IMFSaveOptions } from './mf-save-options.interface';
import { IMFUpdateOptions } from './mf-update-options.interface';
import { IMFModel } from './mf-model.interface';
import { IMFDeleteOptions } from './mf-delete-options.interface';
import { MFOmit } from './tool-types';
import { MFDeleteMode } from '../enums/mf-delete-mode.enum';

/**
 * Service providing every methods to interact with firestore database
 *
 * @typeparam M Model implementing IMFModel concerned by this DAO
 */
export interface IMFDao<M extends IMFModel<M>> {
  /**
   * Collection path with mustache document ids (e.g. lists/{lists}/items)
   */
  mustachePath: string;
  deletionMode: MFDeleteMode;

  /**
   * Get a new instance of model M
   *
   * @param data Data to inject in this model
   * @param location Location of the model in database
   * @returns new model
   */
  getNewModel(data?: Partial<M>, location?: Partial<IMFLocation>): M;

  /**
   * Get the reference from an id (document only), a location (document or collection) or a model (document only)
   *
   * @param idOrLocationOrModel id, location or model from which reference is built
   * @returns Referenceto the document or the collection
   */
  getReference(idOrLocationOrModel: string | Partial<IMFLocation> | M): DocumentReference<M> | CollectionReference<M>;

  /**
   * Get a model from database from id or location
   *
   * @param idOrLocation id or location of the document in database
   * @param options (withSnapshot, completeOnFirst, cacheable)
   * @returns asynchronous answer with model
   */
  get(idOrLocation: string | IMFLocation, options?: IMFGetOneOptions): AsyncType<M>;

  /**
   * Get a model from database from its reference
   *
   * @param reference Document reference
   * @param options (withSnapshot, completeOnFirst, cacheable)
   * @returns asynchronous answer with model
   */
  getByReference(reference: DocumentReference<M>, options?: IMFGetOneOptions): AsyncType<M>;


  /**
   * Get a list of documents in the collection
   *
   * @param location List of path ids
   * @param options (withSnapshot, completeOnFirst, where, orderBy, limit, offset, cacheable)
   */
  getList(location?: MFOmit<IMFLocation, 'id'>, options?: IMFGetListOptions<M>): AsyncType<M[]>;

  /**
   * Create a new document in database
   *
   * @param data Document to insert
   * @param idOrLocation id or location (pathIds)
   * @param options (overwrite)
   * @returns Promise of the model or error if existing id is specified and overwrite is not explicitly set to true
   */
  create(data: M, idOrLocation?: string | Partial<IMFLocation>, options?: IMFSaveOptions): Promise<M>;

  /**
   * Update an existing document in database
   *
   * @param data Data to update in document
   * @param idOrLocationOrModel id, location or model to be updated
   * @param options (deletePreviousOnUpdateFiles)
   * @returns The update data, NOT the updated model
   */
  update(data: Partial<M>, idOrLocationOrModel?: string | IMFLocation | M, options?: IMFUpdateOptions<M>): Promise<Partial<M>>;

  /**
   * Delete a document from database
   *
   * @param idOrLocationOrModel id, location or model to be deleted
   * @param options (deleteOnDeleteFiles)
   */
  delete(idOrLocationOrModel: string | IMFLocation | M, options?: IMFDeleteOptions<M>): Promise<void>;

  /**
   * Convert a database document snapshot to a model
   *
   * @param snapshot Database document snapshot
   * @returns Model
   */
  getModelFromSnapshot(snapshot: DocumentSnapshot<M>): M;

  /**
   * Get a document snapshot from database from an id or a location
   *
   * @param idOrLocation id or location (pathIds)
   * @param options (where, orderBy, limit, offset, cacheable)
   * @returns Async answer with the snapshot
   */
  getSnapshot(idOrLocation: string | IMFLocation, options?: IMFGetOneOptions): AsyncType<DocumentSnapshot<M>>;

  /**
   * Override this method to execute actions before saving document in database
   *
   * @param model the document to save
   * @param idOrLocation id or location (pathIds) where the document will be saved
   * @returns Promise with the document that will be saved instead of the input one
   */
  beforeSave(model: Partial<M>, idOrLocation?: string | Partial<IMFLocation>): Promise<Partial<M>>;

  /**
   * Override this method to save files somewhere else than in firestore storage
   *
   * @param fileObject File object containing the file to save
   * @param idOrLocation id or location (pathIds) of the document containing the file object
   * @returns Promise of the file object containing storage informations
   */
  saveFile(fileObject: IMFFile, idOrLocation: string | IMFLocation): Promise<IMFFile>;

  /**
   * Override this method to delete files from somewhere else than in firestore storage
   *
   * @param fileObject File object containing the file to delete
   */
  deleteFile(fileObject: IMFFile): Promise<void>;
}

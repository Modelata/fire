import 'reflect-metadata';
import { IMFGetListOptions } from '../interfaces/mf-get-list-options.interface';
import { DocumentData } from '../specifics/exports';

/**
 * Decorator to use on a model property. Its value will then be an observable of the list of documents present in the specified collection.
 *
 * @param collectionName name of the subCollection
 * @param daoName dao used to fetch documents list
 * @param options getListOptions (withSnapshot, completeOnFirst, where, orderBy, limit, offset, cacheable)
 */
export function SubCollectionGetList<M extends DocumentData>(
  collectionName: string,
  daoName: string,
  options?: IMFGetListOptions<M>
): any {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      'observableFromSubCollection',
      {
        collectionName,
        daoName,
        options,
      },
      target,
      propertyKey
    );
  };
}

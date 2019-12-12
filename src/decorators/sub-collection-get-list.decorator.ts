import { IMFGetListOptions } from '../interfaces/mf-get-list-options.interface';
import 'reflect-metadata';

export function SubCollectionGetList<M = any>(collectionName: string, daoName: string, options?: IMFGetListOptions<M>): any {
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

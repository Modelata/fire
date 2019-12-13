import { IMFGetListOptions } from './mf-get-list-options.interface';

export interface IMFMetaRef {
  attributeName: string;
  daoName: string;
}

export interface IMFMetaSubCollection<M = any> {
  daoName: string;
  collectionName: string;
  options?: IMFGetListOptions<M>;
}

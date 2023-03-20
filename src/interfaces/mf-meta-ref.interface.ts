import { DocumentData } from '../specifics/exports';
import { IMFGetListOptions } from './mf-get-list-options.interface';

export interface IMFMetaRef {
  attributeName: string;
  daoName: string;
}

export interface IMFMetaSubCollection<M extends DocumentData> {
  daoName: string;
  collectionName: string;
  options?: IMFGetListOptions<M>;
}

import {
  CollectionReference as GcCollectionReference,
  DocumentData as GcDocumentData,
  DocumentReference as GcDocumentReference,
  DocumentSnapshot as GcDocumentSnapshot,
} from '@google-cloud/firestore';

export { OrderByDirection, WhereFilterOp } from '@google-cloud/firestore';

export declare type CollectionReference = GcCollectionReference;
export declare type DocumentReference = GcDocumentReference;
// Generic type needed to match the Angular version
export declare type DocumentSnapshot<M> = GcDocumentSnapshot;
export declare type DocumentData = GcDocumentData;

export declare type AsyncType<M> = Promise<M>;

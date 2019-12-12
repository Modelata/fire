import {
  DocumentReference as GcDocumentReference,
  DocumentSnapshot as GcDocumentSnapshot,
  CollectionReference as GcCollectionReference
} from '@google-cloud/firestore';

export { WhereFilterOp, OrderByDirection } from '@google-cloud/firestore';

export declare type CollectionReference<M> = GcCollectionReference;
export declare type DocumentReference<M> = GcDocumentReference;
export declare type DocumentSnapshot<M> = GcDocumentSnapshot;

export declare type AsyncType<M> = Promise<M>;

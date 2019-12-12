import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';

export declare type OrderByDirection = firestore.OrderByDirection;
export declare type WhereFilterOp = firestore.WhereFilterOp;
export declare type DocumentReference<M> = firestore.DocumentReference;
export declare type CollectionReference<M> = firestore.CollectionReference;
export declare type DocumentSnapshot<T> = DocumentSnapshotExists<T> | DocumentSnapshotDoesNotExist;
export declare type AsyncType<M> = Observable<M>;

export interface DocumentSnapshotExists<T> extends firestore.DocumentSnapshot {
  readonly exists: true;
  data(options?: firestore.SnapshotOptions): T;
}
export interface DocumentSnapshotDoesNotExist extends firestore.DocumentSnapshot {
  readonly exists: false;
  data(options?: firestore.SnapshotOptions): undefined;
  get(fieldPath: string | firestore.FieldPath, options?: firestore.SnapshotOptions): undefined;
}
export interface QueryDocumentSnapshot<T> extends firestore.QueryDocumentSnapshot {
  data(options?: firestore.SnapshotOptions): T;
}



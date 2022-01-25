import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

export declare type OrderByDirection = firebase.firestore.OrderByDirection;
export declare type WhereFilterOp = firebase.firestore.WhereFilterOp;
export declare type DocumentReference<M> = firebase.firestore.DocumentReference;
export declare type CollectionReference<M> = firebase.firestore.CollectionReference;
export declare type DocumentData = firebase.firestore.DocumentData;
export declare type DocumentSnapshot<T> = DocumentSnapshotExists<T> | DocumentSnapshotDoesNotExist;
export declare type AsyncType<M> = Observable<M>;

export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot {
  readonly exists: true;
  data(options?: firebase.firestore.SnapshotOptions): T;
}
export interface DocumentSnapshotDoesNotExist extends firebase.firestore.DocumentSnapshot {
  readonly exists: false;
  data(options?: firebase.firestore.SnapshotOptions): undefined;
  get(fieldPath: string | firebase.firestore.FieldPath, options?: firebase.firestore.SnapshotOptions): undefined;
}
export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot {
  data(options?: firebase.firestore.SnapshotOptions): T;
}



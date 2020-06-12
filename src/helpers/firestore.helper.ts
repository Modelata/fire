import { MFLogger } from '../mf-logger';
import { firestore } from 'firebase/app';

export function convertDataFromDb(data: firestore.DocumentData): firestore.DocumentData {
  if (data) {
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key]) {

        if (typeof (data[key] as any).toDate === 'function') {
          // attribute is a Firebase Timestamp
          data[key] = (data[key] as any).toDate();

        } else if (typeof (data[key] as any) === 'object') {
          // attribute is an object or an array
          if (Object.keys(data[key]).length > 0 && !isDocumentReference(data[key])) {
            data[key] = convertDataFromDb(data[key]);
          }
        }
      }
    }
  }
  return data;
}
export function isDocumentReference(data: any): boolean {
  return data && data.hasOwnProperty('id') && data.hasOwnProperty('parent') && data.hasOwnProperty('path') && data.hasOwnProperty('firestore');
}


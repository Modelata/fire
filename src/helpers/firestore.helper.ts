import { DocumentData } from './../specifics/exports';

export function convertDataFromDb(data: DocumentData): DocumentData {
  if (data) {
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
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
  return !!(data && data.id && data.parent && data.path && data.firestore);
}


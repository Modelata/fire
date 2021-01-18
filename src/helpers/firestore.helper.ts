export function isDocumentReference(data: any): boolean {
  return data && data.hasOwnProperty('id') && data.hasOwnProperty('parent') && data.hasOwnProperty('path') && data.hasOwnProperty('firestore');
}


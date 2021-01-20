export function isDocumentReference(data: any): boolean {
  return !!(data && data.id && data.parent && data.path && data.firestore);
}


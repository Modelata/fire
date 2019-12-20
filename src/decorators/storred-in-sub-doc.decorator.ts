import 'reflect-metadata';

/**
 * Decorates a property that is constructed by DAO with the value of the same property of a subdocument.
 *
 * @param subDocPath the path of the subdocument (WITHOUT main document path)
 */
export function InSubDoc(subDocPath: string): any {
  return (target: any, propertyKey: string) => {
    let subDocPathTrimmed = subDocPath.trim();
    if (subDocPathTrimmed.endsWith('/')) {
      subDocPathTrimmed = subDocPathTrimmed.slice(0, subDocPathTrimmed.length - 1);
    }
    if (subDocPathTrimmed.startsWith('/')) {
      subDocPathTrimmed = subDocPathTrimmed.slice(1);
    }
    Reflect.defineMetadata(
      'subDocPath',
      subDocPathTrimmed,
      target,
      propertyKey
    );
  };
}

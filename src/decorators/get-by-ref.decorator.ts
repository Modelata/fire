import 'reflect-metadata';

/**
 * Decorator to use on a model property. Its value will then be an observable of the document referenced by the linked attribute.
 *
 * @param attributeName The attribute refencing a document from database
 * @param daoName The DAO used to fetch the document
 */
export function GetByRef(attributeName: string, daoName: string): any {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      'observableFromRef',
      {
        attributeName,
        daoName,
      },
      target,
      propertyKey
    );
  };
}

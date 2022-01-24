import 'reflect-metadata';

/**
 * Sets userCollectionPath attribute of the targetted AuthDAO
 *
 * @param path user collection path
 */
export function UsersCollectionPath(path: string): any {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object) => {
    Reflect.defineMetadata('usersCollectionPath', path, target);
  };
}

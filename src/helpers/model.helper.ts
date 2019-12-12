import { IMFLocation, IMFModel } from '../interfaces';
import { mustache } from './string.helper';

/**
 * Returns the path from a collection mustache path ad a location object.
 *
 * @param mustachePath Collection mustache path
 * @param idOrLocation id or Location object containin path ids and document id or not.
 * @returns The path filled with ids
 */
export function getPath<M extends IMFModel<M>>(mustachePath: string, location?: string | Partial<IMFLocation>): string {
  const realLocation = getLocation<M>(location, mustachePath);

  if (!(mustachePath && mustachePath.length)) {
    throw new Error('collectionPath must be defined');
  }
  let path = mustache(mustachePath, realLocation);
  if (path.includes('{')) {
    const missingIdRegex = /{(.*?)}/g;
    const missingIds: string[] = [];
    let missingId;
    while ((missingId = missingIdRegex.exec(path)) !== null) {
      missingIds.push(missingId[1]);
    }
    throw new Error(`collectionIds ${missingIds.join(', ')} missing !!!!`);
  }
  if (realLocation.id) {
    path += `${path.endsWith('/') ? '' : '/'}${realLocation.id}`;
  }
  return path;
}

/**
 * Returns true if the document path is in the same format as the collection path (meaning the document is from this kind of collection)
 * or false if it doesn't
 *
 * @param mustachePath Collection path
 * @param refPath Document path
 */
export function isCompatiblePath(mustachePath: string, refPath: string): boolean {
  if (mustachePath && refPath) {
    const { pathSplitted, mustachePathSplitted } = getSplittedPath(refPath, mustachePath);


    if (mustachePathSplitted.length < pathSplitted.length - 1 || mustachePathSplitted.length > pathSplitted.length) {
      return false;
    }
    return mustachePathSplitted.every((path, index) => {
      return pathSplitted[index] && (path.startsWith('{') || pathSplitted[index] === path);
    });
  }
  return false;

}

/**
 * Return a location object from either unvalued, string id, location object or model
 *
 * @param idOrLocationOrModel string id or location object
 * @returns The location built from params
 */
export function getLocation<M extends IMFModel<M>>(
  idOrLocationOrModel?: string | Partial<IMFLocation> | M,
  mustachePath?: string
): Partial<IMFLocation> {
  if (idOrLocationOrModel) {
    if (typeof idOrLocationOrModel === 'string') {
      return { id: idOrLocationOrModel };
    }
    if (idOrLocationOrModel.hasOwnProperty('_collectionPath') && mustachePath) {
      return getLocationFromPath((idOrLocationOrModel._collectionPath as string), mustachePath, idOrLocationOrModel._id) as IMFLocation;
    }

    return idOrLocationOrModel as Partial<IMFLocation>;
  }
  return {};
}

/**
 * Returns a location object from path and mustache path
 *
 * @param path the path to convert to a location
 * @param mustachePath the collectionPath with mustache ids
 * @param id document id
 * @returns The location object built from params
 */
export function getLocationFromPath(path: string, mustachePath: string, id?: string): Partial<IMFLocation> {
  if (path && mustachePath) {
    const { pathSplitted, mustachePathSplitted } = getSplittedPath(path, mustachePath);

    return mustachePathSplitted.reduce(
      (location: Partial<IMFLocation>, partOfMustachePath: string, index: number) => {
        if (partOfMustachePath.startsWith('{')) {
          location[partOfMustachePath.slice(1, -1)] = pathSplitted[index];
        }
        return location;
      },
      {
        id
      });
  }
  return {};
}

/**
 * Returns arrays of elements constituting model path and mustache path
 *
 * @param path Model path
 * @param mustachePath Dao mustache path
 * @returns an object containing the path splitted and the mustache path splitted too
 */
export function getSplittedPath(path: String, mustachePath: string): {
  pathSplitted: string[],
  mustachePathSplitted: string[],
} {
  const pathSplitted = path.split('/');
  const mustachePathSplitted = mustachePath.split('/');
  if (pathSplitted[0] === '') {
    pathSplitted.shift();
  }
  if (pathSplitted[pathSplitted.length - 1] === '') {
    pathSplitted.pop();
  }
  if (mustachePathSplitted[0] === '') {
    mustachePathSplitted.shift();
  }
  if (mustachePathSplitted[mustachePathSplitted.length - 1] === '') {
    mustachePathSplitted.pop();
  }

  return {
    pathSplitted,
    mustachePathSplitted,
  };
}

/**
 * Returns true if every property of data exists in model. Else, returns false
 *
 * @param data Data that will be checked
 * @param model Model in wich data must fit
 * @param logInexistingData Optional: display log for property missing in model (default is true)
 */
export function allDataExistInModel<M extends IMFModel<M>>(data: Partial<M>, model: M, logInexistingData: boolean = true): boolean {
  for (const key in data) {
    if (!model.hasOwnProperty(key)) {
      if (logInexistingData) {
        console.error(`try to update/add an attribute that is not defined in the model = ${key}`);
      }
      return false;
    }
  }
  return true;
}

/**
 * method used to prepare the data for save
 *
 * @param modelObj the data to save
 * @returns the object cleaned from properties and methods that will not be saved in database
 */
export function getSavableData<M extends IMFModel<M>>(modelObj: M): Partial<M> {

  return Object.keys(modelObj)
    .filter(key =>
      !(key as string).startsWith('_') &&
      typeof modelObj[(key as keyof M)] !== 'undefined' &&
      typeof modelObj[(key as keyof M)] !== 'function'
    )
    .reduce(
      (dbObj: Partial<M>, keyp) => {
        const key: keyof M = keyp as keyof M;
        // if (modelObj[key] && modelObj[key].constructor.name === 'Object') {
        if (modelObj[key] && typeof modelObj[key] === 'object') {
          (dbObj[key] as any) = getSavableData<any>(modelObj[key]);
        } else {
          dbObj[key] = modelObj[key];
        }
        return dbObj;
      },
      {}
    );

}

/**
 * returns list of AuthUser properties
 *
 * @param model The model object
 * @return array of AuthUser properties names
 */
export function getAuthUserProperties(model: Object): string[] {
  return Object.keys(model).filter((key) => {
    return Reflect.hasMetadata('authUserProperty', model as Object, key);
  });
}

/**
 * returns list of file(s) properties
 *
 * @param model The model object
 * @return array of file properties names
 */
export function getFileProperties(model: Object): string[] {
  return Object.keys(model).filter((key) => {
    return Reflect.hasMetadata('storageProperty', model as Object, key);
  });
}

/**
 * returns list of subPath in model
 *
 * @param model The model object
 */
export function getSubPaths<M extends IMFModel<M>>(model: M): string[] {
  return Array.from(new Set(Object.keys(model).map((key) => {
    if (Reflect.hasMetadata('subDocPath', model, key)) {
      return Reflect.getMetadata('subDocPath', model, key);
    }
    return null;
  }).filter(a => !!a)));
}

/**
 * Returns main model merged with properties from subModels
 *
 * @param mainModel The main model (container)
 * @param subModels The sub models (where nested data can be found)
 * @returns The main model merged with all data
 */
export function mergeModels<M extends IMFModel<M>>(mainModel: M, subModels: { [subPath: string]: Partial<M> }): M {
  Object.keys(mainModel).forEach((key) => {
    if (
      Reflect.hasMetadata('subDocPath', mainModel, key)
    ) {
      const subPath = Reflect.getMetadata('subDocPath', mainModel, key);
      if (
        subModels.hasOwnProperty(subPath) &&
        (subModels[subPath] as Object).hasOwnProperty(key)
      ) {
        (mainModel as any)[key] = (subModels[subPath] as any)[key];
      }
    }
  });
  return mainModel;
}


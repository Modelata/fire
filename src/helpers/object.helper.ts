import { MFLogger } from '../mf-logger';

/**
 * creates an hidden property in the given object
 *
 * @param obj the object to create the attribute on
 * @param propName the name of the property
 * @param propVal the value of the property
 */
export function createHiddenProperty(obj: { [key: string]: any }, propName: string, propVal: any): void {
  if (obj) {
    const hiddenPropName = `_${propName}`;
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(hiddenPropName)) {
      obj[hiddenPropName] = propVal;
    } else {
      Object.defineProperty(obj, hiddenPropName, {
        value: propVal,
        enumerable: false,
        configurable: true,
        writable: true
      });
    }
  } else {
    MFLogger.error('you must define an object to set it an hidden property');
  }
}


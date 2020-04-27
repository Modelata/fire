import 'reflect-metadata';
import { MFDeleteMode } from '../enums/mf-delete-mode.enum';

/**
 * Sets default deletion mode of the targetted DAO
 *
 * @param mode hard or soft mode (default: hard)
 */
export function DeletionMode(mode: MFDeleteMode): any {
  return (target: Object) => {
    Reflect.defineMetadata('deletionMode', mode, target);
  };
}

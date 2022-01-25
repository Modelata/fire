import 'reflect-metadata';
import { MFDeleteMode } from '../enums/mf-delete-mode.enum';

/**
 * Sets default deletion mode of the targetted DAO
 *
 * @param mode hard or soft mode (default: hard)
 */
export function DeletionMode(mode: MFDeleteMode): any {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object) => {
    Reflect.defineMetadata('deletionMode', mode, target);
  };
}

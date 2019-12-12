import { IMFModel } from './mf-model.interface';
import { NonFunctionPropertyNames } from './tool-types';

/**
 * List of file properties of the model M for which stored files MUST (true) or MUST NOT be deleted on document update
 * (Overrides behaviour configured in model decorators)
 */
export type IMFDeletePreviousOnUpdateFilesOptions<M extends IMFModel<M>> = {
  /**
   * File property : true => the previous file will be deleted if updated
   * File property : false => the fprevious ile will NOT be deleted if updated
   */[fileAttribute in NonFunctionPropertyNames<M>]?: boolean;
};
/**
 * Options to pass to update method
 */
export interface IMFUpdateOptions<M extends IMFModel<M>> {
  deletePreviousOnUpdateFiles?: IMFDeletePreviousOnUpdateFilesOptions<M>;
}

import { IMFModel } from './mf-model.interface';
import { NonFunctionPropertyNames } from './tool-types';
import { MFDeleteMode } from './../enums/mf-delete-mode.enum';

/**
 * List of file properties of the model M for which stored files MUST (true) or MUST NOT be deleted on document deletion
 * (Overrides behaviour configured in model decorators)
 */
export declare type IMFDeleteOnDeleteFilesOptions<M extends IMFModel<M>> = {
  /**
   * File property : true => the file will be deleted
   * File property : false => the file will NOT be deleted
   */
  [fileAttribute in NonFunctionPropertyNames<M>]?: boolean;
};

/**
 * Options to pass to delete method
 */
export interface IMFDeleteOptions<M extends IMFModel<M>> {
  deleteOnDeleteFiles?: IMFDeleteOnDeleteFilesOptions<M>;
  cascadeOnDelete?: boolean;
  mode?: MFDeleteMode;
}

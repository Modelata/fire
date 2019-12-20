import { MFAuthUserProperties } from '../enums/mf-auth-user-properties.enum';

/**
 * Options passed to sync auth user with user document
 */
export interface IMFAuthDaoSyncOptions {
  /**
   * List of properties that will be synchronized
   */
  propertiesToSync: {
    [key in MFAuthUserProperties]?: boolean;
  };
}


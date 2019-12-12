/**
 * File Object containing file and/or file and storage informations
 */
export interface IMFFile {
  name?: string;
  type?: string;
  contentLastModificationDate?: Date;
  url?: string;
  storagePath?: string;

  /**
   * javascript file object to be stored
   */
  _file?: File;
}

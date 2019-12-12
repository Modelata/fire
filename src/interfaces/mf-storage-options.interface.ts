export interface IMFStorageOptions {
  /**
   * If true, previous file will be deleted before saving new file on document update
   */
  deletePreviousOnUpdate: boolean;

  /**
   * If true, files associated to the document will be deleted before document deletion
   */
  deleteOnDelete: boolean;
}

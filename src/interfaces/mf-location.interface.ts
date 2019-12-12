export interface IMFLocation {
  /**
   * Document id
   */
  id: string;

  /**
   * Path ids, pathIdName must equals containing collection Name
   */
  [pathIdName: string]: string;
}

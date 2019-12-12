export interface IMFGetOneOptions {
  /**
   * Document will include an hidden property containing document snapshote
   */
  withSnapshot?: boolean;

  /**
   * Observable returned will complete on first result
   */
  completeOnFirst?: boolean;

  /**
   * Request result will be cached in order to get a faster answer on same getOne request
   */
  cacheable?: boolean;

  /**
   * Display an error in console when requested document not exists (default: true)
   */
  warnOnMissing?: boolean;
}

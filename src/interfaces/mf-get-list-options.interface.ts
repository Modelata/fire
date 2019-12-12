import { IMFWhere } from './mf-where.interface';
import { IMFOrderBy } from './mf-order-by.interface';
import { IMFOffset } from './mf-offset.interface';

/**
 * Options passed to get list functions
 */
export interface IMFGetListOptions<M> {
  /**
   * Documents will include an hidden property containing document snapshote
   */
  withSnapshot?: boolean;

  /**
   * Observable returned will complete on first result
   */
  completeOnFirst?: boolean;

  /**
   * Where conditions
   */
  where?: IMFWhere[];

  /**
   * Order by
   */
  orderBy?: IMFOrderBy;

  /**
   * Maximum result returned
   */
  limit?: number;

  /**
   * boundary of the get, only one is applied
   */
  offset?: IMFOffset<M>;

  /**
   * Request result will be cached in order to get a faster answer on same getList request
   */
  cacheable?: boolean;
}

import { OrderByDirection } from '../specifics/exports';

/**
 * Order by value
 */
export interface IMFOrderBy {
  /**
   * Field name
   */
  field: string;

  /**
   * order direction (desc or asc)
   */
  operator: OrderByDirection;
}

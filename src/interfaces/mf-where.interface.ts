import { WhereFilterOp } from '../specifics/exports';

/**
 * Where option
 */
export interface IMFWhere {
  field: string;
  operator: WhereFilterOp;
  value: any;
}

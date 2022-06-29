import { Company } from './company';

export type SymbolSearchResponse = {
  count: number;
  result: Company[];
};

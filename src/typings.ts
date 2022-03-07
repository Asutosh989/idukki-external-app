import { Review } from '../../src/typings/Review';

export type { Review } from '../../src/typings/Review';
export type { ReviewDisplayType } from '../../src/typings/Review';

export type QueryRoot = {
  reviewOutQuery: Review[];
};

export type Schema = {
  queryRoot: QueryRoot;
};
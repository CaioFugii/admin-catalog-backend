import { SortDirection } from '../../repository/repository-contracts';

export type SearchInputDto<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_direction?: SortDirection | null;
  filter?: Filter | null;
};

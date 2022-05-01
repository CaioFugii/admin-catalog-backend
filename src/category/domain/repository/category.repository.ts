import { SearchableRepositoryInterface } from 'shared/repository/repository-contracts.interface';
import { Category } from '../entities/category';

export default interface CategoryRepository
  extends SearchableRepositoryInterface<Category, any, any> {}

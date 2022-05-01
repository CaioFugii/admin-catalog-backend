import { Category } from 'category/domain/entities/category';
import CategoryRepository from 'category/domain/repository/category.repository';
import { InMemorySearchableRepository } from 'shared/repository/in-memory.repository';

class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {}

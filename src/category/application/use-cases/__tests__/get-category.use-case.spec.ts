import { Category } from '../../../domain/entities/category';
import { CategoryInMemoryRepository } from '../../../../category/infra/repository/category-in-memory.repository';
import GetCategoryUseCase from '../get-category.use-case';

describe('GetCategoryUseCase Unit Tests', () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  it('should throw an error, when pass a fake ID', async () => {
    expect(
      async () => await useCase.execute({ id: 'fake-id' }),
    ).rejects.toThrow('Entity Not Found using ID fake-id');
  });

  it('should return a category', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new Category({ name: 'Movie' })];
    repository.items = items;

    const output = await useCase.execute({ id: items[0].id });
    expect(output).toStrictEqual({
      id: items[0].id,
      name: 'Movie',
      description: null,
      is_active: true,
      created_at: items[0].created_at,
    });
    expect(spyFindById).toBeCalledTimes(1);
  });
});

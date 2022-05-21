import NotFoundError from '#shared/errors/not-found.error';
import { CategoryInMemoryRepository } from '#category/infra/repository/category-in-memory.repository';
import UpdateCategoryUseCase from '../update-category.use-case';
import { Category } from '#category/domain/entities/category';

describe('UpdateCategoryUseCase Unit Tests', () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');

    expect(() => useCase.execute({ id: 'fake', name: 'test' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake`),
    );
    expect(spyFindById).toHaveBeenCalled();
  });

  it('should update a category', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const items = [
      new Category({
        name: 'Cartoon',
        description: 'Some description',
      }),
    ];
    repository.items = items;

    let output = await useCase.execute({
      id: repository.items[0].id,
      name: 'Movie',
      description: 'Other Description',
    });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'Movie',
      description: 'Other Description',
      is_active: true,
      created_at: repository.items[0].created_at,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(1);

    output = await useCase.execute({
      id: repository.items[0].id,
      name: 'Cartoon',
      description: 'Some description',
      is_active: false,
    });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'Cartoon',
      description: 'Some description',
      is_active: false,
      created_at: repository.items[0].created_at,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(2);

    output = await useCase.execute({
      id: repository.items[0].id,
      name: 'Cartoon',
      is_active: true,
    });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'Cartoon',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(3);
  });
});

import { Category } from '#category/domain/entities/category';
import { CategoryInMemoryRepository } from './category-in-memory.repository';

describe('CategoryInMemoryRepository Unit Tests', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => (repository = new CategoryInMemoryRepository()));

  describe('applyFilter method', () => {
    it('should no filter items when filter param is null', async () => {
      const items = [new Category({ name: 'test' })];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      const itemsFiltered = await repository['applyFilter'](items, null);

      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('should filter items using a filter param', async () => {
      const items = [
        new Category({ name: 'test' }),
        new Category({ name: 'TEST' }),
        new Category({ name: 'fake' }),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      let itemsFiltered = await repository['applyFilter'](items, 'TEST');

      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await repository['applyFilter'](items, 'no-filter');

      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);
    });
  });
  describe('applySort method', () => {
    it('should sort items by created_at when sort param is null', async () => {
      const created_at = new Date();
      const items = [
        new Category({ name: 'test', created_at }),
        new Category({
          name: 'TEST',
          created_at: new Date(created_at.getTime() + 100),
        }),
        new Category({
          name: 'fake',
          created_at: new Date(created_at.getTime() + 200),
        }),
      ];

      let itemsSorted = await repository['applySort'](items, null, null);

      expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
    });

    it('should sort items by name', async () => {
      const items = [
        new Category({ name: 'c' }),
        new Category({ name: 'b' }),
        new Category({ name: 'a' }),
      ];

      let itemsSorted = await repository['applySort'](items, 'name', 'asc');

      expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

      itemsSorted = await repository['applySort'](items, 'name', 'desc');
      expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
    });
  });
  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new Category({ name: 'a' }),
        new Category({ name: 'b' }),
        new Category({ name: 'c' }),
        new Category({ name: 'd' }),
        new Category({ name: 'e' }),
      ];

      let itemsPaginated = await repository['applyPaginate'](items, 1, 2);
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await repository['applyPaginate'](items, 2, 2);
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await repository['applyPaginate'](items, 3, 2);
      expect(itemsPaginated).toStrictEqual([items[4]]);

      itemsPaginated = await repository['applyPaginate'](items, 4, 2);
      expect(itemsPaginated).toStrictEqual([]);
    });
  });
});

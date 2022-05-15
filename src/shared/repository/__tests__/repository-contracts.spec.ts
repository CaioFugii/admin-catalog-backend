import { SearchParams, SearchResult } from '../repository-contracts';

describe('SearchParams Unit Tests', () => {
  test('page property', () => {
    const params = new SearchParams();

    expect(params.page).toBe(1);

    const arrange: any[] = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: '', expected: 1 },
      { page: 'fake', expected: 1 },
      { page: false, expected: 1 },
      { page: true, expected: 1 },
      { page: {}, expected: 1 },
      { page: 1, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 5 },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    arrange.forEach(item => {
      expect(new SearchParams({ page: item.page }).page).toBe(item.expected);
    });
  });

  test('per_page property', () => {
    const params = new SearchParams();

    expect(params.per_page).toBe(15);

    const arrange: any[] = [
      { per_page: null, expected: 15 },
      { per_page: undefined, expected: 15 },
      { per_page: '', expected: 15 },
      { per_page: 'fake', expected: 15 },
      { per_page: false, expected: 15 },
      { per_page: true, expected: 15 },
      { per_page: {}, expected: 15 },
      { per_page: 15, expected: 15 },
      { per_page: -1, expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: 5.5, expected: 5 },
      { per_page: 1, expected: 1 },
      { per_page: 2, expected: 2 },
    ];

    arrange.forEach(item => {
      expect(new SearchParams({ per_page: item.per_page }).per_page).toBe(
        item.expected,
      );
    });
  });

  test('sort property', () => {
    const params = new SearchParams();

    expect(params.sort).toBeNull();

    const arrange: any[] = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: '', expected: null },
      { sort: 'fake', expected: 'fake' },
      { sort: false, expected: 'false' },
      { sort: true, expected: 'true' },
      { sort: {}, expected: '[object Object]' },
      { sort: 0, expected: '0' },
      { sort: 5.5, expected: '5.5' },
      { sort: 1, expected: '1' },
      { sort: -2, expected: '-2' },
    ];

    arrange.forEach(item => {
      expect(new SearchParams({ sort: item.sort }).sort).toBe(item.expected);
    });
  });

  test('sort_direction property', () => {
    const arrangeSort: any[] = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: '', expected: null },
    ];

    arrangeSort.forEach(item => {
      expect(new SearchParams({ sort: item.sort }).sort_direction).toBeNull();
    });

    const arrange: any[] = [
      { sort_direction: null, expected: 'asc' },
      { sort_direction: undefined, expected: 'asc' },
      { sort_direction: '', expected: 'asc' },
      { sort_direction: 'fake', expected: 'asc' },
      { sort_direction: false, expected: 'asc' },
      { sort_direction: true, expected: 'asc' },
      { sort_direction: {}, expected: 'asc' },
      { sort_direction: 0, expected: 'asc' },
      { sort_direction: 5.5, expected: 'asc' },
      { sort_direction: 1, expected: 'asc' },
      { sort_direction: -2, expected: 'asc' },
      { sort_direction: 'asc', expected: 'asc' },
      { sort_direction: 'ASC', expected: 'asc' },
      { sort_direction: 'desc', expected: 'desc' },
      { sort_direction: 'DESC', expected: 'desc' },
    ];

    arrange.forEach(item => {
      expect(
        new SearchParams({ sort: 'field', sort_direction: item.sort_direction })
          .sort_direction,
      ).toBe(item.expected);
    });
  });

  test('filter property', () => {
    const arrange: any[] = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: '', expected: null },
      { filter: 'fake', expected: 'fake' },
      { filter: false, expected: 'false' },
      { filter: true, expected: 'true' },
      { filter: {}, expected: '[object Object]' },
      { filter: 0, expected: '0' },
      { filter: 5.5, expected: '5.5' },
      { filter: 1, expected: '1' },
      { filter: -2, expected: '-2' },
    ];

    arrange.forEach(item => {
      expect(new SearchParams({ filter: item.filter }).filter).toBe(
        item.expected,
      );
    });
  });
});

describe('SearchResult Unit Tests', () => {
  test('constructor props', () => {
    let result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_direction: null,
      filter: null,
    });

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      sort: null,
      sort_direction: null,
      filter: null,
    });

    result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: 'name',
      sort_direction: 'desc',
      filter: 'test',
    });

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      sort: 'name',
      sort_direction: 'desc',
      filter: 'test',
    });
  });

  it('should set last_page 1 when per_page field is greater than total Items', () => {
    const result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 15,
      sort: null,
      sort_direction: null,
      filter: null,
    });

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'],
      total: 4,
      current_page: 1,
      per_page: 15,
      last_page: 1,
      sort: null,
      sort_direction: null,
      filter: null,
    });
  });

  test('last_page property when total is not a multiple of per_page', () => {
    const result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 101,
      current_page: 1,
      per_page: 20,
      sort: null,
      sort_direction: null,
      filter: null,
    });

    expect(result.last_page).toBe(6);
  });
});

import { Category } from './category';
import { omit } from 'lodash';
import UniqueEntityId from '../../../shared/domain/value-objects/unique-entity-id.vo';

describe('Category Unit tests', () => {
  test('constructor of category', () => {
    let category: Category;
    let created_at: Date;

    category = new Category({
      name: 'Movie',
    });
    let props = omit(category.props, 'created_at');
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });

    category = new Category({
      name: 'Movie',
      description: 'other description',
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'other description',
    });

    category = new Category({
      name: 'Movie',
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: 'Movie',
      created_at,
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at,
    });
  });

  test('id prop', () => {
    let category: Category;

    category = new Category({ name: 'Movie' });
    expect(category).toHaveProperty('id');
    expect(category.id).not.toBeNull();
    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    category = new Category({ name: 'Movie' }, null);
    expect(category).toHaveProperty('id');
    expect(category.id).not.toBeNull();
    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    category = new Category({ name: 'Movie' }, undefined);
    expect(category).toHaveProperty('id');
    expect(category.id).not.toBeNull();
    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    category = new Category({ name: 'Movie' }, new UniqueEntityId());
    expect(category).toHaveProperty('id');
    expect(category.id).not.toBeNull();
    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });

  test('getter and setter of name prop', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.name).toBe('Movie');

    category = new Category({ name: 'Movie' });
    category['name'] = 'Cartoon';
    expect(category.name).toBe('Cartoon');
  });

  test('getter and setter of description prop', () => {
    let category: Category;

    category = new Category({ name: 'Movie' });
    expect(category.name).toBe('Movie');
    expect(category.description).toBeNull();

    category = new Category({ name: 'Movie', description: 'some description' });
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('some description');

    category = new Category({ name: 'Movie' });
    category['description'] = 'other description';
    expect(category.description).toBe('other description');

    category = new Category({ name: 'Movie' });
    category['description'] = undefined;
    expect(category.description).toBeNull();
  });

  test('getter and setter of is_active prop', () => {
    let category: Category;

    category = new Category({ name: 'Movie' });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: 'Movie', is_active: false });
    expect(category.is_active).toBeFalsy();

    category = new Category({ name: 'Movie' });
    category['is_active'] = false;
    expect(category.is_active).toBeFalsy();
  });

  test('getter of created_at prop', () => {
    let category: Category;

    category = new Category({ name: 'Movie' });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({ name: 'Movie', created_at });
    expect(category.created_at).toBe(created_at);
  });

  test('update method', () => {
    const category = new Category({
      name: 'Movie',
      description: 'Nice description',
    });
    category.update('Cartoon', 'Ugly description');
    expect(category.name).toBe('Cartoon');
    expect(category.description).toBe('Ugly description');
  });

  test('activate method', () => {
    const category = new Category({
      name: 'Movie',
      description: 'Nice description',
      is_active: false,
    });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test('deactivate method', () => {
    const category = new Category({
      name: 'Movie',
      description: 'Nice description',
    });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });
});

import NotFoundError from '#shared/errors/not-found.error';
import Entity from '#shared/domain/entities/entity';
import { InMemoryRepository } from '../in-memory.repository';
import UniqueEntityId from '#shared/domain/value-objects/unique-entity-id.vo';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });
  it('should insert a new Entity', async () => {
    const entity = new StubEntity({ name: 'Value', price: 10 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should throw error when entity not found', async () => {
    expect(
      repository.findById(
        new UniqueEntityId('a34c99d7-8014-4ebc-8c87-2ed51b020092'),
      ),
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID a34c99d7-8014-4ebc-8c87-2ed51b020092`,
      ),
    );

    const entity = new StubEntity({ name: 'Value', price: 10 });

    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`),
    );

    expect(
      repository.delete(
        new UniqueEntityId('a34c99d7-8014-4ebc-8c87-2ed51b020092'),
      ),
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID a34c99d7-8014-4ebc-8c87-2ed51b020092`,
      ),
    );
  });

  it('should finds an entity by id', async () => {
    const entity = new StubEntity({ name: 'Value', price: 10 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should return all entities', async () => {
    const entity = new StubEntity({ name: 'Value', price: 10 });
    await repository.insert(entity);

    const entities = await repository.find();
    expect(entities).toStrictEqual([entity]);
  });

  it('should updates an entity', async () => {
    const entity = new StubEntity({ name: 'Value', price: 10 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: 'Value Updated', price: 1 },
      entity.uniqueEntityId,
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should deletes an entity', async () => {
    const entity = new StubEntity({ name: 'Value', price: 10 });
    await repository.insert(entity);
    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});

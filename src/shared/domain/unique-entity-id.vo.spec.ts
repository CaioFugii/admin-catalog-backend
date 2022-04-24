import InvalidUuidError from '../../shared/errors/invalid-uuid.error';
import UniqueEntityId from './unique-entity-id.vo';

import { validate as uuidValidate } from 'uuid';

describe('UniqueEntityId Unit tests', () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const uuid = 'cc48601f-539f-462b-9bce-6559863517da';
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid NOT passed in constructor', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});

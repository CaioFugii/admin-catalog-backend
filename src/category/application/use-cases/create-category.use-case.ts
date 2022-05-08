import CategoryRepository from '../../domain/repository/category.repository';
import { Category } from '../../domain/entities/category';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../dto/category-output.dto';
import UseCase from 'shared/application/use-case';

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = CategoryOutput;

export default class CreateCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = new Category(input);
    await this.categoryRepo.insert(entity);
    return CategoryOutputMapper.toOutput(entity);
  }
}

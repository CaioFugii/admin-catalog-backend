import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../shared/application/dto/pagination-output';
import { SearchInputDto } from '../../../shared/application/dto/search-input';
import UseCase from '../../../shared/application/use-case';
import { CategoryRepository } from '../../domain/repository/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../dto/category-output.dto';

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    const items = searchResult.items.map(category =>
      CategoryOutputMapper.toOutput(category),
    );
    const pagination = PaginationOutputMapper.toOutput(searchResult);
    return {
      items,
      ...pagination,
    };
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isCategoryExists = await this.categoryRepository.findBy({
      user: { id },
      title: createCategoryDto.title,
    });

    if (isCategoryExists.length) {
      throw new BadRequestException('This category already exists');
    }

    const newCategoryDto = {
      title: createCategoryDto.title,
      user: {
        id,
      },
    };

    const newCategory = await this.categoryRepository.save(newCategoryDto);
    return newCategory;
  }

  async findAll(id: number) {
    const userCategories = await this.categoryRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        transactions: true,
      },
    });
    return userCategories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { user: true, transactions: true },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const updatedCategory = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );

    return updatedCategory;
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.categoryRepository.delete(id);
  }
}

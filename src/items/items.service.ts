import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });

    const item = new Item({
      ...createItemDto,
      listing,
    });

    return await this.entityManager.save(item);
  }

  async findAll() {
    return await this.itemsRepository.find();
  }

  async findOne(id: number) {
    return await this.itemsRepository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    if (!item) throw new NotFoundException(`User with id: ${id} not found!`);

    if (updateItemDto.name) {
      item.name = updateItemDto.name;
    }
    if (updateItemDto.public) {
      item.public = updateItemDto.public;
    }

    return this.entityManager.save(item);
  }

  remove(id: number) {
    this.itemsRepository.delete(id);
    return { message: 'Item deleted successfully!' };
  }
}

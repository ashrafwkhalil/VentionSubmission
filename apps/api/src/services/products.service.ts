import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { Product } from "@ventionsubmission/models"
import { Repository } from "typeorm"

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  constructor(@InjectRepository(Product) repository: Repository<Product>) {
    super(repository)
  }
  getHello() : string {
    return "Hello World";
  }
}

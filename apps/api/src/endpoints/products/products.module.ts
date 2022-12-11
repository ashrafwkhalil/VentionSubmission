import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Product } from "@ventionsubmission/models"
import { ProductsServiceModule } from "../../services/products-service.module"
import { ProductsService } from "../../services/products.service"
import { ProductsController } from "./products.controller"

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductsServiceModule],
  providers: [ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}


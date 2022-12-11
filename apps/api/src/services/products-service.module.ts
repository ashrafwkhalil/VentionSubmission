import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Product } from "@ventionsubmission/models"
import { ProductsService } from "./products.service"

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
  exports: [ProductsService],
  controllers: [],
})
export class ProductsServiceModule {}

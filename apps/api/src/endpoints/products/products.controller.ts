import { Controller, Get } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { Crud, CrudController } from "@nestjsx/crud"
import { Product } from "@ventionsubmission/models"

import { ProductsService } from "../../services/products.service"

@ApiTags("products")
@Controller("products")
@Crud({
  model: { type: Product },
  routes: {
    exclude: ["createManyBase", "getOneBase", "replaceOneBase"],
    getManyBase: { decorators: [ApiOperation({ operationId: "getManyProducts", summary: "Retrieve multiple Products" })] },
    createOneBase: { decorators: [ApiOperation({ operationId: "createOneProduct", summary: "Create one Product" })] },
    updateOneBase: { decorators: [ApiOperation({ operationId: "updateOneProduct", summary: "Update a single Product" })] },
    deleteOneBase: { decorators: [ApiOperation({ operationId: "deleteOneProduct", summary: "Delete a single Product" })] },
  },
})
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}
  @Get('hello')
  getHello() : string {
    return this.service.getHello();
  }
}

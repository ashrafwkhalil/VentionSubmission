import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"

import { configuration } from "../config/configuration"
import { HealthModule } from "../endpoints/health/health.module"
import { TodosModule } from "../endpoints/todos/todos.module"
import { getRootModuleImports } from "../utils/utils"
import { ProductsModule } from "../endpoints/products/products.module"

@Module({
  imports: [
    ...getRootModuleImports(configuration),
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/assets`,
      exclude: ["/api*"],
    }),
    HealthModule,
    TodosModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

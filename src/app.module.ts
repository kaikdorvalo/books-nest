import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ProductsModule } from './products/products.module';
import { ProductPriceMiddleware } from './products/middlewares/productPrice.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/books-nest'),
    BooksModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');

    consumer
      .apply(ProductPriceMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.POST })
  }
}

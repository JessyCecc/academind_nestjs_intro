import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TestController} from "./jcc_test/test.controller";
import {TestService} from "./jcc_test/test.service";
import {ProductsModule} from "./products/products.module";

@Module({
  imports: [ProductsModule],
  controllers: [AppController, TestController],
  providers: [AppService, TestService],
})
export class AppModule {}

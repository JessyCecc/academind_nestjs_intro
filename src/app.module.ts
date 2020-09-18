import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TestController} from "./jcc_test/test.controller";
import {TestService} from "./jcc_test/test.service";
import {ProductsModule} from "./products/products.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [ProductsModule,
    MongooseModule.forRoot(
        'mongodb+srv://DEV-jcc:R.T.db.ad.20@cluster0.w3eun.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
    )],
  controllers: [AppController, TestController],
  providers: [AppService, TestService],
})
export class AppModule {}

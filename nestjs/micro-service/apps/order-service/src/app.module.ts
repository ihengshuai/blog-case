import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderStatusModule } from './modules/order-status/order-status.module';

@Module({
  imports: [OrderStatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

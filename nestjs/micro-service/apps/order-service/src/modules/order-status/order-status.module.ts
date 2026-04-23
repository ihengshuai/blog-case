import { Module } from '@nestjs/common';
import { OrderStatusController } from './order-status.controller';

@Module({
  controllers: [OrderStatusController],
})
export class OrderStatusModule {}

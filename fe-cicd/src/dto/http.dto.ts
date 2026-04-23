import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";

/** 分页 */
export class Pager {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(val => parseInt(val.value || 1))
  @IsPositive() // 大于0
  @Type(() => Number)
  @IsNumber()
  readonly page: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(val => parseInt(val.value || 10))
  @Type(() => Number)
  @IsNumber()
  readonly size: number = 10;
}

/** 分页响应 */
export class PagerRes extends Pager {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(val => parseInt(val.value || 0))
  @Type(() => Number)
  @IsNumber()
  readonly total: number = 0;
}

/** 排序 */
export class OrderDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(val => val.value)
  readonly orderBy: string;

  @ApiProperty({ required: false, type: () => ["asc", "desc"], enum: ["asc", "desc"] })
  @IsOptional()
  @IsEnum(["asc", "desc"], { message: "order must be asc or desc" })
  @Transform(val => val.value)
  readonly order: "asc" | "desc";
}

/** 列表结果 */
export class ListResultDto<T> {
  @ApiProperty({ required: true })
  items?: T[];

  @ApiProperty({ required: true, type: PagerRes })
  pager: Pager;
}

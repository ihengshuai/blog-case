import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

import { ListResultDto } from "./http.dto";

/** 用户模型 */
export class UserDto {
  @ApiProperty({ required: false, type: () => ["male", "remale"], enum: ["male", "remale"] })
  @IsOptional()
  @IsString()
  sex?: "male" | "remale";

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  age: number;
}

/** 用户列表查询类型 */
export class UsersQueryDto extends UserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  keywords?: string;

  @ApiProperty({ required: false, description: "出生日期范围" })
  @IsOptional()
  @IsString()
  birthRange: string;
}

/** 用户列表响应类型 */
export class UsersResponseDto extends ListResultDto<UserDto> {
  @ApiProperty({ type: UserDto, isArray: true })
  items: [];
}

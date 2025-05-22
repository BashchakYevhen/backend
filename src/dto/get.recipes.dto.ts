import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class GetRecipesDto {
  @ApiPropertyOptional({
    description: 'Search term to filter recipes by name or description',
    example: 'chocolate',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  search?: string;
}

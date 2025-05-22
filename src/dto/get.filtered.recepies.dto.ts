import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetFilteredRecipesDto {
  @ApiPropertyOptional({
    description: 'Ingredient to filter recipes',
    example: 'tomato',
    required: false,
  })
  @IsOptional()
  @IsString()
  ingredients?: string;

  @ApiPropertyOptional({
    description: 'Country of origin to filter recipes',
    example: 'Italy',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'Category to filter recipes',
    example: 'Dessert',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;
}

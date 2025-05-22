import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetRecipesDto } from './dto/get.recipes.dto';
import { GetFilteredRecipesDto } from './dto/get.filtered.recepies.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('recipes')
  getAllRecipes(@Query() query: GetRecipesDto) {
    return this.appService.getAllRecipes(query.search);
  }
  @Get('filtered-recipes')
  getFilteredRecipes(@Query() query: GetFilteredRecipesDto) {
    return this.appService.getFilteredRecipes(
      query.ingredients,
      query.country,
      query.category,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get recipe by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Recipe ID',
    required: true,
  })
  getRecipeById(@Param('id') id: string) {
    return this.appService.getRecipeById(id);
  }
}

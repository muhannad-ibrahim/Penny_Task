import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return this.productService.findAll();
  }

  @Post()
  async createProduct(
    @Body('name') name: string,
  ) {
    return this.productService.createProduct(name);
  }
}

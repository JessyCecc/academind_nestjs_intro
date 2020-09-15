import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {Product} from "./products.model";

@Controller('products')     // [DN]/products
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()             // POST /products
    // let's set incomming request configuration to affect all variables
    addProduct(@Body('title') prodTitle: string,
               @Body('description') prodDesc: string,
               @Body('price') prodPrice: number,
    ): any {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId}
    }

    @Get()              // GET /products
    getProducts() {
    // getProducts():Product[] {
        return this.productsService.getProducts();
    }

    @Get(':id')     // GET /products/2
    getSingleProduct(@Param('id') id: string) {
        return this.productsService.getSingleProduct(id);
    }
}


import {Body, Controller, Get, Post} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {Product} from "./products.model";

@Controller('products')     // [DN]/products
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    // let's set incomming request configuration to affect all variables
    addProduct(@Body('title') prodTitle: string,
               @Body('description') prodDesc: string,
               @Body('price') prodPrice: number,
    ): any {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId}
    }

    @Get()
    getProducts() {
    // getProducts():Product[] {
        return this.productsService.getProducts();
    }
}


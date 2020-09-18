import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {Product} from "./products.model";

@Controller('products')     // [DN]/products
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()             // POST /products
    // let's set incomming request configuration to affect all variables
    async addProduct(@Body('title') prodTitle: string,
               @Body('description') prodDesc: string,
               @Body('price') prodPrice: number,
    ) {
        const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
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

    // we use PATCH instead of PUT because we want to merge modification instead of replacing
    // PATCH as a body, we could get id in the body, but it's make sense to get it from url
    @Patch(':id')
    updateProduct(@Param('id') prodId: string,
                  @Body('title') prodTitle: string,
                  @Body('description') prodDesc: string,
                  @Body('price') prodPrice: number,
    ): any {
        return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);

    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string) {
        return this.productsService.deleteProduct(prodId);
    }
}


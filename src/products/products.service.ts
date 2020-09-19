import {Injectable, NotFoundException} from "@nestjs/common";
import {Product} from "./products.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price,
        });
        const result = await newProduct.save();    // await will wait for the promise newProduct.save to be complete (we have to add async to the function)
        // console.log('ProductsService.insertProduct save result', result);
        return result.id as string;
    }

    async getProducts() {
        // return [...this.products];      // we use [...xx] to make a copy of the object so we can't modify it outside
        const products = await this.productModel.find().exec();     // .exec() will give us a real promise
        return products as Product[];       // we can be clear by adding "as Product[]" of which type
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        // return product;
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        }
    }

    async updateProduct(productId: string,
                  title: string,
                  desc: string,
                  price: number
    ){
        const updatedProduct = await this.findProduct(productId);
        // we would like to modify only data that are specify in the body and not the undify data
        let updated = false;
        if (title)  { updatedProduct.title = title; updated=true; }
        if (desc)   { updatedProduct.description = desc; updated=true; }
        if (price)  { updatedProduct.price = price; updated=true; }
        if (!updated) {
            throw new NotFoundException('No data to modify');
        }
        await updatedProduct.save();
        return {result: 1};
    }

    async deleteProduct(productId: string) {
        // 1)
        // const productToDelete = await this.findProduct(productId);
        // await productToDelete.remove();

        // 2)
        let result, deletedCount = 0;
        try {
            result = await this.productModel.deleteOne({_id: productId}).exec();
            deletedCount = result.deletedCount; // we can use result.n too
        } catch(error) {
            throw new NotFoundException('No data to remove');
        }
        if (!deletedCount) {
            throw new NotFoundException('No data to found');
        }
        return {result: deletedCount};
    }

    // ----- --------------------------------------------------

    private async findProduct(id: string): Promise<Product> {
        let product = null;
        try {
            product = await this.productModel.findById(id).exec();
        } catch(error) {
            throw new NotFoundException('This id is invalid ('+id+').');
        }
        if (!product) {
            throw new NotFoundException('Could not found product with this id '+id+'.');
        }
        return product;
    }

}
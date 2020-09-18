import {Injectable, NotFoundException} from "@nestjs/common";
import {Product} from "./products.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ProductsService {
    // set products to private so only be used inside the class
    private products: Product[] = [];   // initially set to []

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string,
                  desc: string,
                  price: number
    ) {
        // const prodId = Math.random().toString();
        // const prodId = (this.products.length + 1).toString();
        // const prodId = new Date().toString();
        const newProduct = new this.productModel({
            title,
            description: desc,
            price,
        });
        // this.products.push(newProduct);
        // return prodId;
        const result = await newProduct.save();    // await will wait for the promise newProduct.save to be complete (we have to add async to the function)
        // console.log('ProductsService.insertProduct save result', result);
        return result.id as string;
    }

    async getProducts() {
        // return [...this.products];      // we use [...xx] to make a copy of the object so we can't modify it outside
        const products = await this.productModel.find().exec();     // .exec() will give us a real promise
        return products as Product[];       // we can be clear by adding "as Product[]" of which type
    }

    getSingleProduct(productId: string) {
        const [product] = this.findProduct(productId);
        if (!product) {
            throw new NotFoundException('Could not found product.');
        }
        return {...product};
    }

    updateProduct(productId: string,
                  title: string,
                  desc: string,
                  price: number
    ){

        const [product, productIndex] = this.findProduct(productId);
        // we would like to modify only data that are specify in the body and not the undify data
        const updatedProduct = {...product};
        let updated = false;
        if (title)  { updatedProduct.title = title; updated=true; }
        if (desc)   { updatedProduct.description = desc; updated=true; }
        if (price)  { updatedProduct.price = price; updated=true; }
        if (!updated) {
            throw new NotFoundException('No data to modify');
        }
        this.products[productIndex] = updatedProduct;
        return {result: 1};
    }

    deleteProduct(productId: string) {
        const [_, index] = this.findProduct(productId);   //alternative
        // const index = this.findProduct(productId)[1];
        this.products.splice(index, 1);
        return {result: 1};
    }

    // ----- --------------------------------------------------

    private findProduct(id: string): [Product, number] {
        // const product = this.products.find((prod) => prod.id === id);
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not found product.');
        }
        return [product, productIndex];
    }

}
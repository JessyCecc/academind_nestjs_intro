import {Injectable, NotFoundException} from "@nestjs/common";
import {Product} from "./products.model";

@Injectable()
export class ProductsService {
    // set products to private so only be used inside the class
    private products: Product[] = [];   // initially set to []

    insertProduct(title: string,
                  desc: string,
                  price: number
    ): string {
        // const prodId = new Date().toString();
        // const prodId = Math.random().toString();
        const prodId = (this.products.length + 1).toString();
        const newProduct = new Product(
            prodId,
            title,
            desc,
            price
        );
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
    // getProducts():Product[] {
        return [...this.products];      // we use [...xx] to make a copy of the object so we can't modify it outside
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
        if (desc)   { updatedProduct.desc = desc; updated=true; }
        if (price)  { updatedProduct.price = price; updated=true; }
        if (!updated) {
            throw new NotFoundException('No data to modify');
        }
        this.products[productIndex] = updatedProduct;
        return {result: 1};
    }



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
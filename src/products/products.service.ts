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
        const product = this.products.find((prod) => prod.id === productId);
        if (!product) {
            throw new NotFoundException('Could not found product.');
        }
        return {...product};
    }
}